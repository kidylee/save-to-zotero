import { ConversationDistributionTask, TwitterResponse } from "../src/index";
import { enc, HmacSHA1 } from "crypto-js";
import OAuth from "oauth-1.0a";
import { DMMessageData } from "./type";

export function encodeURIfix(str: string) {
  return encodeURIComponent(str).replace(/!/g, "%21");
}

interface TwitterApiInit {
  consumerKey: string;
  consumerSecret: string;
  accessToken: string;
  accessTokenSecret: string;
  botId: string;
  bearerToken: string;
}

export class TwitterApi {
  parameters: TwitterApiInit;
  oauth: OAuth;
  token: OAuth.Token;

  constructor(init: TwitterApiInit) {
    this.parameters = init;

    function hashSha1(baseString: any, key: any) {
      return HmacSHA1(baseString, key).toString(enc.Base64);
    }

    this.oauth = new OAuth({
      consumer: {
        key: this.parameters.consumerKey,
        secret: this.parameters.consumerSecret,
      },
      signature_method: "HMAC-SHA1",
      hash_function: hashSha1,
    });

    this.token = {
      key: this.parameters.accessToken,
      secret: this.parameters.accessTokenSecret,
    };
  }

  sendDM = async (messageData: DMMessageData, recipientId: string) => {
    const reqAuth = {
      url: "https://api.twitter.com/1.1/direct_messages/events/new.json",
      method: "POST",
    };

    const reqBody = JSON.stringify({
      event: {
        type: "message_create",
        message_create: {
          target: {
            recipient_id: recipientId,
          },
          message_data: messageData,
        },
      },
    });

    return await fetch(reqAuth.url, {
      method: reqAuth.method,
      headers: {
        ...this.oauth.toHeader(this.oauth.authorize(reqAuth, this.token)),
        "Content-Type": "application/json",
      },
      body: reqBody,
    });
  };
  replyTweet = async (tweetId: string, tweetContent: string): Promise<any> => {
    const reqAuth = {
      url: "https://api.twitter.com/2/tweets",
      method: "POST",
    };

    const reqBody = JSON.stringify({
      text: tweetContent,
      reply: { in_reply_to_tweet_id: tweetId },
    });

    return await fetch(reqAuth.url, {
      method: reqAuth.method,
      headers: {
        ...this.oauth.toHeader(this.oauth.authorize(reqAuth, this.token)),
        "Content-Type": "application/json",
      },
      body: reqBody,
    });
  };

  api = async <T>(url: string): Promise<T> => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.parameters.bearerToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  };

  getMentioned = async (
    sinceId?: string | null,
    pagination_token?: string
  ): Promise<TwitterResponse> => {
    return await this.api<TwitterResponse>(
      getMentionedURL(sinceId, pagination_token)
    );
  };

  getLastPageOfMentionedTweets = async (
    sinceId?: string | null,
    response?: TwitterResponse
  ): Promise<TwitterResponse> => {
    if (!response) {
      const page = await this.getMentioned();
      return await this.getLastPageOfMentionedTweets(sinceId, page);
    }
    if (!response.meta.next_token) {
      return response;
    }

    if (response.meta.next_token) {
      return await this.getLastPageOfMentionedTweets(
        sinceId,
        await this.getMentioned(sinceId, response.meta.next_token)
      );
    }
    return response;
  };

  getThread = async (
    senderId: string,
    conversationId: string
  ): Promise<TwitterResponse> => {
    const url = new URL(`https://api.twitter.com/2/tweets/search/recent`);
    url.searchParams.append("tweet.fields", "in_reply_to_user_id,created_at");
    url.searchParams.append(
      "expansions",
      "referenced_tweets.id,in_reply_to_user_id"
    );
    url.searchParams.append("max_results", "100");
    url.searchParams.append(
      "query",
      `from:${senderId} to:${senderId} conversation_id:${conversationId}`
    );
    url.searchParams.append("place.fields", "full_name,name");
    const resp = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${this.parameters.bearerToken}`,
      },
    });
    if (resp.status !== 200) {
      console.error("Error fetching thread", await resp.text());
    }
    return await resp.json();
  };

  listDirectMessages = async (): Promise<any> => {
    const reqAuth = {
      url: "https://api.twitter.com/1.1/direct_messages/events/list.json",
      method: "GET",
    };
    return await fetch(reqAuth.url, {
      method: reqAuth.method,
      headers: {
        ...this.oauth.toHeader(this.oauth.authorize(reqAuth, this.token)),
        "Content-Type": "application/json",
      },
    });
  };

  createWelcomeMessage = async (): Promise<any> => {
    const reqAuth = {
      url: "https://api.twitter.com/1.1/direct_messages/welcome_messages/new.json",
      method: "POST",
    };
    return await fetch(reqAuth.url, {
      method: reqAuth.method,
      headers: {
        ...this.oauth.toHeader(this.oauth.authorize(reqAuth, this.token)),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        welcome_message: {
          name: "Welcome Message",
          message_data: {
            text: "Welcome to the Save to Zotero bot! Send me a tweet with a link to a webpage and I'll save it to Zotero for you.",
          },
        },
      }),
    });
  };
  enrichTweet = async (tweetId: string): Promise<SingleTweet> => {
    const resp = await fetch(
      `https://api.twitter.com/2/tweets/${tweetId}?tweet.fields=conversation_id,created_at&expansions=author_id&user.fields=name,username`,
      {
        headers: {
          Authorization: `Bearer ${this.parameters.bearerToken}`,
        },
      }
    );
    if (!resp.ok) {
      console.error("Error query conversationId", await resp.text());
    }
    return await resp.json();
  };

  newWelcomeMessageRule = async (messageId: string): Promise<any> => {
    const reqAuth = {
      url: "https://api.twitter.com/1.1/direct_messages/welcome_messages/rules/new.json",
      method: "POST",
    };
    return await fetch(reqAuth.url, {
      method: reqAuth.method,
      headers: {
        ...this.oauth.toHeader(this.oauth.authorize(reqAuth, this.token)),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        welcome_message_rule: {
          welcome_message_id: messageId,
        },
      }),
    });
  };
}

export function getMentionedURL(
  sinceId?: string | null,
  pagination_token?: string
): string {
  const url = new URL(
    `https://api.twitter.com/2/users/${bindings.TWITTER_ACCOUNT}/mentions`
  );
  url.searchParams.append("max_results", process.env.MAX_RESULTS ?? "20");
  url.searchParams.append(
    "tweet.fields",
    "conversation_id,created_at,author_id,in_reply_to_user_id"
  );

  if (sinceId) {
    url.searchParams.append("since_id", sinceId);
  }
  if (pagination_token) {
    url.searchParams.append("pagination_token", pagination_token);
  }

  return url.toString();
}

/**
 * return a map, key is conversation id, value is list of twitter ids
 * @param resp
 */
export const getConversationTasks = (
  resp: TwitterResponse
): ConversationDistributionTask[] => {
  const map = new Map<string, ConversationDistributionTask>();
  resp.data.forEach((tweet) => {
    if (!map.has(tweet.conversation_id)) {
      map.set(tweet.conversation_id, {
        conversationId: tweet.conversation_id,
        mentionedTweets: [],
      });
    }
    map.get(tweet.conversation_id)?.mentionedTweets.push(tweet);
  });
  return Array.from(map.values());
};

export interface SingleTweet {
  data: {
    id: string;
    text: string;
    conversation_id: string;
    created_at: string;
  };
  includes: {
    users: [
      {
        id: string;
        name: string;
        username: string;
      }
    ];
  };
}
