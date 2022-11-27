import { TwitterZoteroAPIValue } from "./types";

export async function createNote(
  param: { note: string; itemType: string; parentItem: string },
  zoteroAPIValue: TwitterZoteroAPIValue
) {
  const resp = await fetch(
    `https://api.zotero.org/users/${zoteroAPIValue.userID}/items`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Zotero-API-Key": zoteroAPIValue.oauth_token_secret,
      },
      body: JSON.stringify([param]),
    }
  );
  if (resp.status !== 200) {
    console.error("Error create note", await resp.text());
  }
}
