import { LAST_TWEET_ID, TWITTER_ID_PREFIX } from "../src/constants";
import { processMention, pullMentions } from "../src";

import "../bindings";
import "../globals";
import { TwitterApi } from "@save-to-zotero/twitter-api";

jest.mock("@save-to-zotero/twitter-api");
const twitterApiMocked = TwitterApi as jest.MockedClass<typeof TwitterApi>;

declare function getMiniflareBindings(): Bindings;
describe("scheduled", () => {
  beforeAll(() => {
    twitterApiMocked.mockClear();

    const env = getMiniflareBindings();
    globalThis.bindings = env;
  });

  test("test no zotero api key", async () => {
    const mockReplyTweet = jest.fn();
    const originalModule = jest.requireActual("@save-to-zotero/twitter-api");
    twitterApiMocked.mockImplementation(() => {
      return {
        ...originalModule,
        replyTweet: mockReplyTweet,
        getMentioned: jest.fn(),
        getLastPageOfMentionedTweets: jest.fn(),
        api: jest.fn(),
      };
    });
    globalThis.twitterApi = new TwitterApi({
      consumerKey: "",
      consumerSecret: "",
      accessToken: "",
      accessTokenSecret: "",
      botId: "",
    });
    await processMention({
      id: "123",
      text: "test",
      author_id: "123",
      conversation_id: "123",
      created_at: "123",
      in_reply_to_user_id: "123",
    });
    expect(mockReplyTweet).toBeCalledWith(
      "123",
      "You need to authorize me to save to Zotero, please check my pinned tweet."
    );
  });
  test("test has zotero api key", async () => {
    const mockReplyTweet = jest.fn();
    const originalModule = jest.requireActual("@save-to-zotero/twitter-api");
    twitterApiMocked.mockImplementation(() => {
      return {
        ...originalModule,
        replyTweet: mockReplyTweet,
        getMentioned: jest.fn(),
        getLastPageOfMentionedTweets: jest.fn(),
        api: jest.fn(),
      };
    });
    globalThis.twitterApi = new TwitterApi({
      consumerKey: "",
      consumerSecret: "",
      accessToken: "",
      accessTokenSecret: "",
      botId: "",
    });
    await bindings.TWITTER_ZOTERO_API_KV.put(TWITTER_ID_PREFIX + "123", "123");
    await processMention({
      id: "123",
      text: "test",
      author_id: "123",
      conversation_id: "123",
      created_at: "123",
      in_reply_to_user_id: "123",
    });
    const list = await bindings.MENTIONED_ID_CONVERSATION_ID_KV.list();
    const k = list.keys[0].name;

    expect(await bindings.MENTIONED_ID_CONVERSATION_ID_KV.get(k)).toEqual(
      "123"
    );
  });
});
