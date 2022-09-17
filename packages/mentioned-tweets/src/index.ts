import { getLastPageOfMentionedTweets } from "@save-to-zotero/twitter-api";
import { LAST_TWEET_ID } from "./constants";
import { TwitterResponse } from "@save-to-zotero/twitter-api";

export const pullMentions = async (): Promise<TwitterResponse | undefined> => {
  const last_id = await bindings.TWITTER_KV.get(LAST_TWEET_ID);

  const resp = await getLastPageOfMentionedTweets(last_id);
  if (resp?.meta.result_count && resp?.meta.result_count != 0) {
    await bindings.TWITTER_KV.put(LAST_TWEET_ID, resp.data[0].id);
  }
  return resp;
};

export const worker = {
  async scheduled(
    controller: ScheduledController,
    env: Bindings,
    ctx: ExecutionContext
  ) {
    bindings = env;
    // ctx.waitUntil(pullMentionedTweets(env));
  },
};

export default worker;
