import { Tweet } from "@save-to-zotero/twitter-api";
import { LAST_TWEET_ID, TWITTER_ID_PREFIX } from "./constants";
import { TwitterResponse } from "@save-to-zotero/twitter-api";
import { TwitterApi } from "@save-to-zotero/twitter-api/src/twitter_api";

export const pullMentions = async (): Promise<TwitterResponse | undefined> => {
  const last_id = await bindings.TWITTER_PROCESS_KV.get(LAST_TWEET_ID);

  const resp: TwitterResponse = await twitterApi.getLastPageOfMentionedTweets(
    last_id
  );
  if (resp?.meta.result_count && resp?.meta.result_count != 0) {
    await bindings.TWITTER_PROCESS_KV.put(LAST_TWEET_ID, resp.data[0].id);
  }
  return resp;
};

export const processMentions = async (tweets: Tweet[]): Promise<void> => {
  for (const tweet of tweets) {
    if (bindings.TWITTER_ZOTERO_API_KV) {
    }
  }
};

export const processMention = async (tweet: Tweet): Promise<void> => {
  const zoteroApiKey = await bindings.TWITTER_ZOTERO_API_KV.get(
    TWITTER_ID_PREFIX + tweet.author_id
  );
  if (zoteroApiKey) {
    await bindings.MENTIONED_ID_CONVERSATION_ID_KV.put(
      tweet.id,
      tweet.conversation_id
    );
  } else {
    return twitterApi.replyTweet(
      tweet.id,
      "You need to authorize me to save to Zotero, please check my pinned tweet."
    );
  }
};
export const worker = {
  async scheduled(
    controller: ScheduledController,
    env: Bindings,
    ctx: ExecutionContext
  ) {
    bindings = env;
    twitterApi = new TwitterApi({
      consumerKey: bindings.TWITTER_CONSUMER_KEY,
      consumerSecret: bindings.TWITTER_CONSUMER_SECRET,
      accessToken: bindings.TWITTER_ACCESS_TOKEN_KEY,
      accessTokenSecret: bindings.TWITTER_ACCESS_TOKEN_SECRET,
      botId: bindings.TWITTER_ACCOUNT,
    });
    // ctx.waitUntil(pullMentionedTweets(env));
  },
};

export default worker;
