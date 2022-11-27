import { ZoteroCollection } from "./types";
import { createDefaultCollectionKey } from "./create_default_collection_key";

export const getDefaultCollectionKey = async (
  userId: string,
  zoteroApiKey: string
): Promise<string> => {
  const resp = await fetch(
    `https://api.zotero.org/users/${userId}/collections/top?sort=title`,
    {
      headers: {
        "Zotero-API-Key": zoteroApiKey,
      },
    }
  );
  if (resp.status !== 200) {
    console.error("Error fetching collections", await resp.text());
  }
  const collections: ZoteroCollection[] = await resp.json();
  console.log(collections);
  if (collections.length === 0) {
    return createDefaultCollectionKey(userId, zoteroApiKey);
  } else {
    return collections[0].key;
  }
};
