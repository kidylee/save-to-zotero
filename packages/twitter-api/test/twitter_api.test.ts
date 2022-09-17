import {
  api,
  getConversationTasks,
  getLastPageOfMentionedTweets,
  getMentioned,
  getMentionedURL,
  searchConversation,
} from "../src/twitter_api";
import "../bindings";
import "../globals";
import { TwitterResponse } from "../../twitter-api";

declare function getMiniflareBindings(): Bindings;

describe("twitter_api", () => {
  test("API", async () => {
    globalThis.bindings = getMiniflareBindings();
    const rest = await api<TwitterResponse>(
      "https://api.twitter.com/2/users/296579936/mentions"
    );
    expect(rest).toBeDefined();
  });

  test("getMentioned", async () => {
    globalThis.bindings = getMiniflareBindings();
    const rest = await getMentioned();
    expect(rest).toBeDefined();
  });

  test("getMentioned since id", async () => {
    globalThis.bindings = getMiniflareBindings();
    const rest = await getMentioned();
    const rest2 = await getMentioned(rest.data[0].id);
    expect(rest2.meta.result_count).toBe(0);
  });

  test("getLastPage", async () => {
    globalThis.bindings = getMiniflareBindings();
    process.env.MAX_RESULTS = "100";

    const rest = await getLastPageOfMentionedTweets();
    expect(rest?.meta.next_token).not.toBeDefined();

    const rest2 = await getMentioned();
    const rest3 = await getLastPageOfMentionedTweets(rest2.data[0].id);
    expect(rest3?.meta.result_count).toBe(0);
  });

  test("compose params", async () => {
    process.env.MAX_RESULTS = "100";

    let params = getMentionedURL("123", "456");
    expect(params.toString()).toBe(
      "https://api.twitter.com/2/users/296579936/mentions?max_results=100&tweet.fields=conversation_id%2Ccreated_at%2Cauthor_id%2Cin_reply_to_user_id&since_id=123&pagination_token=456"
    );

    params = getMentionedURL(undefined, "456");
    expect(params.toString()).toBe(
      "https://api.twitter.com/2/users/296579936/mentions?max_results=100&tweet.fields=conversation_id%2Ccreated_at%2Cauthor_id%2Cin_reply_to_user_id&pagination_token=456"
    );

    params = getMentionedURL(undefined, undefined);
    expect(params.toString()).toBe(
      "https://api.twitter.com/2/users/296579936/mentions?max_results=100&tweet.fields=conversation_id%2Ccreated_at%2Cauthor_id%2Cin_reply_to_user_id"
    );
  });

  test("conversation Tasks", async () => {
    globalThis.bindings = getMiniflareBindings();

    const tasks = getConversationTasks(resp);
    expect(tasks.length).toBe(4);
    expect(tasks[0].conversationId).toBe("1565968972859682816");
    expect(tasks[3].mentionedTweets.length).toBe(2);
    expect(tasks[1].conversationId).toBe("1569602108110020608");
  });

  test("searchConversation", async () => {
    const resp = await searchConversation("1569983551055220736");
    expect(resp.meta.result_count).toBe(4);
  });
});

const resp: TwitterResponse = {
  data: [
    {
      text: "@KidyLee 的确教方法论比较合理",
      in_reply_to_user_id: "296579936",
      created_at: "2022-09-13T09:56:10.000Z",
      id: "1569625980528119809",
      conversation_id: "1565968972859682816",
      author_id: "720635682138394624",
    },
    {
      text: "@KidyLee 这个价格国内也是很舒服了，只是国内上40不是很友好了",
      in_reply_to_user_id: "296579936",
      created_at: "2022-09-13T09:53:25.000Z",
      id: "1569625285771018241",
      conversation_id: "1569602108110020608",
      author_id: "720635682138394624",
    },
    {
      text: "@KidyLee 用的什么技术，什么项目啊",
      in_reply_to_user_id: "296579936",
      created_at: "2022-09-13T00:31:51.000Z",
      id: "1569483966436233216",
      conversation_id: "1569476209100361728",
      author_id: "364478145",
    },
    {
      text: "@KidyLee @Life__Mastery Here's another thread similar to this one by @MindMastery__:\nhttps://t.co/u6SBQplBZ7\nHave feedback on the relevance of this similar thread? Let us know in the replies!",
      in_reply_to_user_id: "1316495843621511168",
      created_at: "2022-09-12T13:30:18.000Z",
      id: "1569317481390477312",
      conversation_id: "1568980634927759360",
      author_id: "1316495843621511168",
    },
    {
      text: '@KidyLee @Life__Mastery ...impact of emotions on decision-making."',
      in_reply_to_user_id: "1316495843621511168",
      created_at: "2022-09-12T13:30:18.000Z",
      id: "1569317480467763208",
      conversation_id: "1568980634927759360",
      author_id: "1316495843621511168",
    },
  ],
  meta: {
    next_token: "7140dibdnow9c7btw4232y6pkfhurcexwzar5v7n75fsl",
    result_count: 5,
    newest_id: "1569124133509767168",
    oldest_id: "1568457109263745025",
  },
};
