import { CreateZoteroItem, TwitterZoteroAPIValue } from "./types";
import { ZoteroCreationResponse } from "./create_default_collection_key";

export async function createItem(
  zoteroItem: CreateZoteroItem,
  zoteroAPIValue: TwitterZoteroAPIValue
): Promise<string> {
  const resp = await fetch(
    `https://api.zotero.org/users/${zoteroAPIValue.userID}/items`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Zotero-API-Key": zoteroAPIValue.oauth_token_secret,
      },
      body: JSON.stringify([zoteroItem]),
    }
  );
  if (resp.status !== 200) {
    console.error("Error create item", await resp.text());
  }
  const json: ZoteroCreationResponse = await resp.json();
  return json.success["0"];
}
