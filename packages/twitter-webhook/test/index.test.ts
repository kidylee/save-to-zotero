import { ZoteroCollection } from "../src/types";
import { Bindings } from "../src";

describe("twitter webhooks", () => {
  it("Collection sort", async () => {
    const collections: ZoteroCollection[] = [
      {
        key: "C5LCDUSW",
        version: 218,
        library: {
          type: "user",
          id: 3070033,
          name: "kidylee",
          links: {
            alternate: {
              href: "https://www.zotero.org/kidylee",
              type: "text/html",
            },
          },
        },
        links: {
          self: {
            href: "https://api.zotero.org/users/3070033/collections/C5LCDUSW",
            type: "application/json",
          },
          alternate: {
            href: "https://www.zotero.org/kidylee/collections/C5LCDUSW",
            type: "text/html",
          },
        },
        meta: {
          numCollections: 1,
          numItems: 0,
        },
        data: {
          key: "C5LCDUSW",
          version: 218,
          name: "writing",
          parentCollection: false,
          relations: {},
        },
      },
      {
        key: "JDQLZKVX",
        version: 167,
        library: {
          type: "user",
          id: 3070033,
          name: "kidylee",
          links: {
            alternate: {
              href: "https://www.zotero.org/kidylee",
              type: "text/html",
            },
          },
        },
        links: {
          self: {
            href: "https://api.zotero.org/users/3070033/collections/JDQLZKVX",
            type: "application/json",
          },
          alternate: {
            href: "https://www.zotero.org/kidylee/collections/JDQLZKVX",
            type: "text/html",
          },
        },
        meta: {
          numCollections: 0,
          numItems: 6,
        },
        data: {
          key: "JDQLZKVX",
          version: 167,
          name: "^inbox",
          parentCollection: false,
          relations: {},
        },
      },
      {
        key: "A7NTGCTD",
        version: 107,
        library: {
          type: "user",
          id: 3070033,
          name: "kidylee",
          links: {
            alternate: {
              href: "https://www.zotero.org/kidylee",
              type: "text/html",
            },
          },
        },
        links: {
          self: {
            href: "https://api.zotero.org/users/3070033/collections/A7NTGCTD",
            type: "application/json",
          },
          alternate: {
            href: "https://www.zotero.org/kidylee/collections/A7NTGCTD",
            type: "text/html",
          },
        },
        meta: {
          numCollections: 2,
          numItems: 1,
        },
        data: {
          key: "A7NTGCTD",
          version: 107,
          name: "Books",
          parentCollection: false,
          relations: {},
        },
      },
    ];
    const cls = collections
      .map((collection) => {
        const {
          data: { key, name },
        } = collection;
        return { name: name, key: key };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    expect(cls[0].key).toBe("JDQLZKVX");
  });
});
