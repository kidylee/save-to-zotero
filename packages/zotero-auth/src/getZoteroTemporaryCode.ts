import OAuth from "oauth-1.0a";
import { enc, HmacSHA1 } from "crypto-js";
import { globalEnv } from "./index";

export async function getZoteroTemporaryCode(): Promise<TempCodeResponse> {
  const ZOTERO_APP_CLIENT_KEY = globalEnv!.ZOTERO_APP_CLIENT_KEY;
  const ZOTERO_APP_CLIENT_SECRET = globalEnv!.ZOTERO_APP_CLIENT_SECRET;
  const oauth = new OAuth({
    consumer: {
      key: ZOTERO_APP_CLIENT_KEY,
      secret: ZOTERO_APP_CLIENT_SECRET,
    },
    signature_method: "HMAC-SHA1",
    hash_function(base_string: any, key: any) {
      return HmacSHA1(base_string, key).toString(enc.Base64);
    },
  });
  const tokenRequestConfig = {
    url: "https://www.zotero.org/oauth/request",
    method: "POST",
    data: {
      oauth_callback: "https://zotero-auth.savetozotero.workers.dev/callback",
    },
  };
  const tokenRequestResponse = await fetch(globalEnv!.STRIPE_HEADER_PROXY, {
    headers: {
      ...oauth.toHeader(oauth.authorize(tokenRequestConfig)),
    },
    method: "post",
  });
  const tokenRequestData = await tokenRequestResponse.text();
  const searchParams = new URLSearchParams(tokenRequestData);
  const obj: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    obj[key] = value;
  }
  return obj;
}
