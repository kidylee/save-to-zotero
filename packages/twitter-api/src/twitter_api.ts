import {
  ConversationDistributionTask,
  TwitterResponse,
} from "@save-to-zotero/twitter-api";

export async function api<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${bindings.TWITTER_BEARER}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export const getLastPageOfMentionedTweets = async (
  sinceId?: string | null,
  response?: TwitterResponse
): Promise<TwitterResponse | undefined> => {
  if (!response) {
    const page = await getMentioned();
    return await getLastPageOfMentionedTweets(sinceId, page);
  }
  if (!response.meta.next_token) {
    return response;
  }

  if (response.meta.next_token) {
    return await getLastPageOfMentionedTweets(
      sinceId,
      await getMentioned(sinceId, response.meta.next_token)
    );
  }
  return response;
};

export async function getMentioned(
  sinceId?: string | null,
  pagination_token?: string
): Promise<TwitterResponse> {
  return await api<TwitterResponse>(getMentionedURL(sinceId, pagination_token));
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

export const searchConversation = async (
  conversationId: string
): Promise<TwitterResponse> => {
  const url = new URL(
    `https://api.twitter.com/2/tweets/search/recent?query=conversation_id:${conversationId}`
  );
  url.searchParams.append("tweet.fields", "in_reply_to_user_id");
  url.searchParams.append(
    "expansions",
    "referenced_tweets.id,in_reply_to_user_id"
  );
  return await api<TwitterResponse>(url.toString());
};
