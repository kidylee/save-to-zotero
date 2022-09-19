import { processTasks, worker } from "../src/index";
import "../bindings";
import "../globals";

declare function getMiniflareBindings(): Bindings;
function createExecutionContext(): ExecutionContext {
  return {
    waitUntil: () => Promise.resolve(),
    passThroughOnException: () => {},
  };
}

describe("test generate", () => {
  test("GET /", async () => {
    const req = new Request("http://falcon", { method: "GET" });
    const env = getMiniflareBindings();
    const result = await worker.fetch(req, env, createExecutionContext());
    expect(result.status).toBe(200);

    const text = await result.text();
    expect(text).toBe("Hello World");
  });

  test("process task", async () => {
    await processTasks(tasks);
  });
});

const tasks = [
  {
    conversationId: "1565968972859682816",
    mentionedTweets: [
      {
        text: "@KidyLee 的确教方法论比较合理",
        in_reply_to_user_id: "296579936",
        created_at: "2022-09-13T09:56:10.000Z",
        id: "1569625980528119809",
        conversation_id: "1565968972859682816",
        author_id: "720635682138394624",
      },
    ],
  },
  {
    conversationId: "1569602108110020608",
    mentionedTweets: [
      {
        text: "@KidyLee 这个价格国内也是很舒服了，只是国内上40不是很友好了",
        in_reply_to_user_id: "296579936",
        created_at: "2022-09-13T09:53:25.000Z",
        id: "1569625285771018241",
        conversation_id: "1569602108110020608",
        author_id: "720635682138394624",
      },
    ],
  },
  {
    conversationId: "1569476209100361728",
    mentionedTweets: [
      {
        text: "@KidyLee 用的什么技术，什么项目啊",
        in_reply_to_user_id: "296579936",
        created_at: "2022-09-13T00:31:51.000Z",
        id: "1569483966436233216",
        conversation_id: "1569476209100361728",
        author_id: "364478145",
      },
    ],
  },
  {
    conversationId: "1568980634927759360",
    mentionedTweets: [
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
  },
];
