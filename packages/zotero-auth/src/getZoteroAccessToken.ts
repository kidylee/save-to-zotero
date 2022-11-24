import { oauth } from "./index";

export async function getZoteroAccessToken(
  oauth_token: string,
  oauth_secret: string,
  oauth_verifier: string
): Promise<AccessTokenResponse> {
  const tokenExchangeConfig = {
    url: `https://www.zotero.org/oauth/access?oauth_token=${oauth_token}`,
    method: "POST",
    data: {
      oauth_verifier: oauth_verifier,
    },
  };
  const tokenExchangeResponse = await fetch(
    `https://stripheader-yelksq4xea-uw.a.run.app/oauth/access?oauth_token=${oauth_token}`,
    {
      headers: {
        ...oauth!.toHeader(
          oauth!.authorize(tokenExchangeConfig, {
            key: oauth_token,
            secret: oauth_secret,
          })
        ),
      },
      method: "post",
    }
  );
  const tokenExchangeData = await tokenExchangeResponse.text();
  const searchParams = new URLSearchParams(tokenExchangeData);
  const obj: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    obj[key] = value;
  }

  return obj;
}
