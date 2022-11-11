import { Router } from "cloudworker-router";
import { enc, HmacSHA256 } from "crypto-js";
import { AccountActivityWebhookEvent, Env } from "./types";
import { TwitterApi } from "@save-to-zotero/twitter-api";
import { handleDMs } from "./services";

const router = new Router<Bindings>();

router.get("/", async (ctx) => {
  return new Response("Hello World");
});

router.get("/webhook/twitter", async (ctx) => {
  const { searchParams } = new URL(ctx.request.url);
  const base = searchParams.get("crc_token")!;

  const result = HmacSHA256(base, ctx.env.TWITTER_CONSUMER_SECRET).toString(
    enc.Base64
  );
  const json = { response_token: `sha256=${result}` };
  return new Response(JSON.stringify(json), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
});

router.post("/webhook/twitter", async (ctx) => {
  const event: AccountActivityWebhookEvent =
    await ctx.request.json<AccountActivityWebhookEvent>();

  if (event.direct_message_events) {
    await handleDMs(event.direct_message_events);
  } else if (event.tweet_create_events) {
    console.log(JSON.stringify(event.tweet_create_events));
  } else {
    console.log(JSON.stringify(event), "doesn't support");
  }

  console.log(event);
  return new Response(null, { status: 200 });
});

export default {
  async fetch(
    request: Request,
    env: Bindings,
    ctx: ExecutionContext
  ): Promise<Response> {
    globalEnv = env;
    twitterApi = new TwitterApi({
      consumerKey: globalEnv.TWITTER_CONSUMER_KEY,
      consumerSecret: globalEnv.TWITTER_CONSUMER_SECRET,
      accessToken: globalEnv.TWITTER_ACCESS_TOKEN_KEY,
      accessTokenSecret: globalEnv.TWITTER_ACCESS_TOKEN_SECRET,
      botId: globalEnv.TWITTER_ACCOUNT,
    });
    return router.handle(request, env, ctx);
  },
};

export var globalEnv: Bindings | null = null;
export var twitterApi: TwitterApi | null = null;

interface Bindings {
  TWITTER_BEARER: string;
  TWITTER_ACCOUNT: string;
  TWITTER_CONSUMER_KEY: string;
  TWITTER_CONSUMER_SECRET: string;
  TWITTER_ACCESS_TOKEN_KEY: string;
  TWITTER_ACCESS_TOKEN_SECRET: string;
}
