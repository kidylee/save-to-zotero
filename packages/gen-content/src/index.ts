import { ConversationDistributionTask } from "@save-to-zotero/twitter-api";
import { Router } from "cloudworker-router";
import { replayTweet } from "@save-to-zotero/twitter-api/src/twitter_api";
import jose from "node-jose";

const router = new Router<Bindings>();
router.get("/", async (ctx) => {
  const tweetId = "1569986020397182976";
  const url = new URL(
    `https://api.twitter.com/1/statuses/update.json?status=afwef&in_reply_to_status_id=${tweetId}&auto_populate_reply_metadata=true`
  );
  const params = url.searchParams.toString();
  for (const [key, value] of url.searchParams.entries()) {
    console.log(key, value);
  }
  const oauth_consumer_key = encodeURIComponent("9IJ76jr6mVpn7df3W87ItpUHa");
  const oauth_nonce = encodeURIComponent("ABCD1234");
  const oauth_signature_method = encodeURIComponent("HMAC-SHA1");
  const oauth_timestamp = encodeURIComponent(Math.floor(Date.now() / 1000));
  const oauth_token = encodeURIComponent(
    "7QSvoNE1bG41sbAKMPQXAqx3glnIbayylZ58rh3TPUmcKY0mNw"
  );
  const oauth_version = encodeURIComponent("1.0");
  const encoder = new TextEncoder();

  const secretKeyData = encoder.encode(
    "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw&LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE"
  );
  const key = await crypto.subtle.importKey(
    "raw",
    secretKeyData,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"]
  );

  const dataToAuthenticate =
    "POST&https%3A%2F%2Fapi.twitter.com%2F1.1%2Fstatuses%2Fupdate.json&include_entities%3Dtrue%26oauth_consumer_key%3Dxvz1evFS4wEEPTGEFPHBog%26oauth_nonce%3DkYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1318622958%26oauth_token%3D370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb%26oauth_version%3D1.0%26status%3DHello%2520Ladies%2520%252B%2520Gentlemen%252C%2520a%2520signed%2520OAuth%2520request%2521";

  const mac = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(dataToAuthenticate)
  );

  var base64Mac = btoa(String.fromCharCode(...new Uint8Array(mac)));

  return new Response(base64Mac);
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
