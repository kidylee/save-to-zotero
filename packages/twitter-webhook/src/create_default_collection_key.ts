export const createDefaultCollectionKey = async (
  userId: string,
  zoteroApiKey: string
): Promise<string> => {
  const resp = await fetch(
    `https://api.zotero.org/users/${userId}/collections`,
    {
      method: "POST",
      headers: {
        "Zotero-API-Key": zoteroApiKey,
      },
      body: JSON.stringify([
        {
          name: "from twitter",
        },
      ]),
    }
  );
  if (resp.status !== 200) {
    console.error("Error create default collection.", await resp.text());
  }
  const responseJson: ZoteroCreationResponse = await resp.json();
  return responseJson.success["0"];
};

export interface ZoteroCreationResponse {
  successful: {
    [key: string]: {
      key: string;
      version: number;
      library: {
        type: string;
        id: number;
        name: string;
      };
    };
  };
  success: {
    [key: string]: string;
  };
}
