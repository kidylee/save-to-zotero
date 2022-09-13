import {
  api,
  getConversationTasks,
  getLastPage,
  getMentioned,
  getMentionedURL,
} from "../src/twitter_api";
import "../src/globals";
import { Env } from "../src";
import {MentionedResponse} from "../../types";

declare function getMiniflareBindings(): Env;

describe("twitter_api", () => {
  test("API", async () => {
    globalThis.env = getMiniflareBindings();
    const rest = await api<MentionedResponse>(
      "https://api.twitter.com/2/users/296579936/mentions"
    );
    expect(rest).toBeDefined();
  });

  test("getMentioned", async () => {
    globalThis.env = getMiniflareBindings();
    const rest = await getMentioned();
    expect(rest).toBeDefined();
  });

  test("getMentioned since id", async () => {
    globalThis.env = getMiniflareBindings();
    const rest = await getMentioned();
    const rest2 = await getMentioned(rest.data[0].id);
    expect(rest2.meta.result_count).toBe(0);
  });

  test("getLastPage", async () => {
    globalThis.env = getMiniflareBindings();
    process.env.MAX_RESULTS = "100";

    const rest = await getLastPage();
    expect(rest?.meta.next_token).not.toBeDefined();

    const rest2 = await getMentioned();
    const rest3 = await getLastPage(rest2.data[0].id);
    expect(rest3?.meta.result_count).toBe(0);
  });

  test("compose params", async () => {
    process.env.MAX_RESULTS = "100";

    let params = getMentionedURL("123", "456");
    expect(params.toString()).toBe(
      "https://api.twitter.com/2/users/296579936/mentions?max_results=100&tweet.fields=conversation_id&since_id=123&pagination_token=456"
    );

    params = getMentionedURL(undefined, "456");
    expect(params.toString()).toBe(
      "https://api.twitter.com/2/users/296579936/mentions?max_results=100&tweet.fields=conversation_id&pagination_token=456"
    );

    params = getMentionedURL(undefined, undefined);
    expect(params.toString()).toBe(
      "https://api.twitter.com/2/users/296579936/mentions?max_results=100&tweet.fields=conversation_id"
    );
  });

  test("conversation Tasks", async () => {
    const tasks = getConversationTasks(resp);
    expect(tasks.length).toBe(2);
    expect(tasks[0].conversationId).toBe("1569122185775841281");
    expect(tasks[0].tweetIds.length).toBe(1);
    expect(tasks[1].conversationId).toBe("1568421152007266305");
  });
});

const resp: MentionedResponse = {
  data: [
    {
      conversation_id: "1569122185775841281",
      text: "@KidyLee 生物打印机",
      author_id: "176712992",
      id: "1569124133509767168",
      created_at: "2022-09-12T00:42:01.000Z",
    },
    {
      conversation_id: "1568421152007266305",
      text: "@KidyLee Hey 安啦.\nYou didn't connect your Notion Database yet. Check my pinned tweet to see how it works.",
      author_id: "1458788154106912769",
      id: "1568795575281131520",
      created_at: "2022-09-11T02:56:26.000Z",
    },
    {
      conversation_id: "1568421152007266305",
      text: "@KidyLee 收到，我回去看看",
      author_id: "1296780148927168513",
      id: "1568499776894734338",
      created_at: "2022-09-10T07:21:02.000Z",
    },
    {
      conversation_id: "1568421152007266305",
      text: "@KidyLee 那就好，不过得到的搜索还行吧",
      author_id: "41510545",
      id: "1568465743016239106",
      created_at: "2022-09-10T05:05:48.000Z",
    },
    {
      conversation_id: "1568421152007266305",
      text: "@KidyLee 先谢为敬",
      author_id: "1296780148927168513",
      id: "1568457109263745025",
      created_at: "2022-09-10T04:31:30.000Z",
    },
  ],
  meta: {
    next_token: "7140dibdnow9c7btw4232y6pkfhurcexwzar5v7n75fsl",
    result_count: 5,
    newest_id: "1569124133509767168",
    oldest_id: "1568457109263745025",
  },
};
