import { ConversationDistributionTask } from "@save-to-zotero/twitter-api";
import { Router } from "cloudworker-router";

const router = new Router<Bindings>();
router.get("/", async (ctx) => {
  return new Response(`gen content is up!`);
});

router.post("/no-apikey/:tweetId", async (ctx) => {
  const { tweetId } = ctx.params;
  if (!tweetId) {
    return new Response("no tweet id", { status: 400 });
  }
  // console.log(oauth.authorize(request_data, accessToken));

  return new Response(ctx.params.tweetId);
});

export const processTasks = async (tasks: ConversationDistributionTask[]) => {
  for (const task of tasks) {
    console.log(task);
  }
};
export const worker = {
  async fetch(
    request: Request,
    env: Bindings,
    ctx: ExecutionContext
  ): Promise<Response> {
    globalThis.bindings = env;
    return router.handle(request, env, ctx);
  },
};

export default worker;
