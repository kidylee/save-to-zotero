import {getLastPage} from "./twitter_api";
import {LAST_TWEET_ID} from "./constants";
import {MentionedResponse} from "@save-to-zotero/types";



export const pullMentions = async (): Promise<
  MentionedResponse | undefined
> => {
  const last_id = await bindings.TWITTER_KV.get(LAST_TWEET_ID);

  const resp = await getLastPage(last_id);
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
