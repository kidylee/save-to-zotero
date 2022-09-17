import { LAST_TWEET_ID } from "../src/constants";
import { pullMentions } from "../src";
import { getMentioned } from "@save-to-zotero/twitter-api";
import "../bindings";
import "../globals";

declare function getMiniflareBindings(): Bindings;

describe("scheduled", () => {
  test("pull mentions", async () => {
    process.env.MAX_RESULTS = "100";

    const env = getMiniflareBindings();
    globalThis.bindings = env;
    const lastId = await env.TWITTER_KV.get(LAST_TWEET_ID);
    const resp = await pullMentions();
    expect(await env.TWITTER_KV.get("LAST_TWEET_ID")).toBe(resp?.data[0].id);
  });

  test("no mentions", async () => {
    process.env.MAX_RESULTS = "100";

    const env = getMiniflareBindings();
    globalThis.bindings = env;
    const resp = await getMentioned();
    await env.TWITTER_KV.put(LAST_TWEET_ID, resp?.data[0].id);
    const resp2 = await pullMentions();
    expect(resp2?.meta.result_count).toBe(0);
  });
});
