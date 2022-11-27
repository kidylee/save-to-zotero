import { Router } from "cloudworker-router";
import OAuth from "oauth-1.0a";
import { enc, HmacSHA1 } from "crypto-js";
import { getZoteroAccessToken } from "./getZoteroAccessToken";
import { getZoteroTemporaryCode } from "./getZoteroTemporaryCode";

const router = new Router<Env>();

router.get("/connect", async (ctx) => {
  const id = new URL(ctx.request.url).searchParams.get("applicationId");
  if (id == null) {
    return new Response("No applicationId provided", { status: 400 });
  }

  const senderId = await ctx.env.TWITTER_ZOTERO_CONNECTING_KV.get(id);
  if (senderId == null) {
    return new Response("No senderId found", { status: 400 });
  }
  const tempResponse = await getZoteroTemporaryCode();
  console.log(tempResponse);

  const value: ZoteroOauthKV = {
    oauthToken: tempResponse.oauth_token!,
    oauthTokenSecret: tempResponse.oauth_token_secret!,
    senderId: senderId,
  };
  await ctx.env.ZOTERO_AUTH_KV.put(
    tempResponse.oauth_token!,
    JSON.stringify(value),
    { expirationTtl: 60 * 60 }
  );
  const url = `https://www.zotero.org/oauth/authorize?oauth_token=${tempResponse.oauth_token}&library_access=1&notes_access=1&write_access=1&all_groups=write`;
  return Response.redirect(url);
});

router.get("/callback", async (ctx) => {
  const url = new URL(ctx.request.url);

  const oauth_token = url.searchParams.get("oauth_token")!;
  const oauth_verifier = url.searchParams.get("oauth_verifier")!;
  const authInfoStr = await ctx.env.ZOTERO_AUTH_KV.get(oauth_token);
  if (authInfoStr == null) {
    return new Response("Error: oauth_token not found or expired", {
      status: 400,
    });
  }
  const authInfo = JSON.parse(authInfoStr) as ZoteroOauthKV;
  const result = await getZoteroAccessToken(
    oauth_token,
    authInfo.oauthTokenSecret,
    oauth_verifier
  );
  const json = await ctx.env.ZOTERO_AUTH_KV.get(oauth_token);
  if (json == null) {
    return new Response("Error: oauth_token not found or expired", {
      status: 400,
    });
  }
  const value = JSON.parse(json) as ZoteroOauthKV;
  await ctx.env.TWITTER_ZOTERO_API_KV.put(
    value.senderId,
    JSON.stringify(result)
  );
  return new Response("Hello world!");
});

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    globalEnv = env;
    oauth = new OAuth({
      consumer: {
        key: globalEnv.ZOTERO_APP_CLIENT_KEY,
        secret: globalEnv.ZOTERO_APP_CLIENT_SECRET,
      },
      signature_method: "HMAC-SHA1",
      hash_function(base_string, key) {
        return HmacSHA1(base_string, key).toString(enc.Base64);
      },
    });
    return router.handle(request, env, ctx);
  },
};

export var globalEnv: Env | null = null;
export var oauth: OAuth | null = null;

export interface Env {
  TWITTER_ZOTERO_CONNECTING_KV: KVNamespace;
  ZOTERO_AUTH_KV: KVNamespace;
  TWITTER_ZOTERO_API_KV: KVNamespace;
  ZOTERO_APP_CLIENT_KEY: string;
  ZOTERO_APP_CLIENT_SECRET: string;
  STRIPE_HEADER_PROXY: string;
}
