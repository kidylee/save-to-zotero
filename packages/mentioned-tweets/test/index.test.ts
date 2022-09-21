import { LAST_TWEET_ID } from "../src/constants";
import { pullMentions } from "../src";

const env = getMiniflareBindings();
globalThis.bindings = env;
import {
  getMentioned,
  getLastPageOfMentionedTweets,
} from "@save-to-zotero/twitter-api";
import "../bindings";
import "../globals";

// jest.mock("@save-to-zotero/twitter-api");
declare function getMiniflareBindings(): Bindings;

describe("scheduled", () => {
  beforeAll(() => {
    const env = getMiniflareBindings();
    globalThis.bindings = env;
  });

  test("pull mentions", async () => {
    process.env.MAX_RESULTS = "100";
    const mockedGetLastPageOfMentionedTweets =
      getLastPageOfMentionedTweets as jest.MockedFunction<
        typeof getLastPageOfMentionedTweets
      >;

    // mockedGetLastPageOfMentionedTweets.mockResolvedValue(undefined);
    // const resp = await pullMentions();
    // expect(resp).toBeUndefined();
  });
  //
  // test("no mentions", async () => {
  //   process.env.MAX_RESULTS = "100";
  //
  //   const env = getMiniflareBindings();
  //   globalThis.bindings = env;
  //   const resp = await getMentioned();
  //   await env.TWITTER_KV.put(LAST_TWEET_ID, resp?.data[0].id);
  //   const resp2 = await pullMentions();
  //   expect(resp2?.meta.result_count).toBe(0);
  // });
});
