import { Router } from "cloudworker-router";
import { enc, HmacSHA256 } from "crypto-js";
import { AccountActivityWebhookEvent, Env } from "./types";
import { TwitterApi } from "@save-to-zotero/twitter-api";
import { handleDMs } from "./dm_handler";
import { handleMentionedTweets } from "./mentioned_handler";

const router = new Router<Bindings>();

router.get("/", async (ctx) => {
  return new Response("Hello World");
});

router.get("/webhook/twitter", async (ctx) => {
  const { searchParams } = new URL(ctx.request.url);
  const base = searchParams.get("crc_token")!;
  console.log("base", base);
  console.log("secret", ctx.env.TWITTER_CONSUMER_SECRET);

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
    if ("user_has_blocked" in event && event.user_has_blocked == false) {
      await handleMentionedTweets(event.tweet_create_events);
    }
  } else {
  }

  console.log(JSON.stringify(event, null, 2));
  return new Response(null, { status: 200 });
});

export default {
  async fetch(
    request: Request,
    env: Bindings,
    ctx: ExecutionContext
  ): Promise<Response> {
    bindings = env;
    twitterApi = new TwitterApi({
      consumerKey: bindings.TWITTER_CONSUMER_KEY,
      consumerSecret: bindings.TWITTER_CONSUMER_SECRET,
      accessToken: bindings.TWITTER_ACCESS_TOKEN_KEY,
      accessTokenSecret: bindings.TWITTER_ACCESS_TOKEN_SECRET,
      botId: bindings.TWITTER_ACCOUNT,
    });
    return router.handle(request, env, ctx);
  },
};

export var bindings: Bindings | null = null;
export var twitterApi: TwitterApi | null = null;

interface Bindings {
  TWITTER_BEARER: string;
  TWITTER_ACCOUNT: string;
  TWITTER_CONSUMER_KEY: string;
  TWITTER_CONSUMER_SECRET: string;
  TWITTER_ACCESS_TOKEN_KEY: string;
  TWITTER_ACCESS_TOKEN_SECRET: string;
  TWITTER_ZOTERO_API_KV: KVNamespace;
  TWITTER_ZOTERO_CONNECTING_KV: KVNamespace;
}
