import { TwitterApi } from "@save-to-zotero/twitter-api/src/twitter_api";

declare global {
  var bindings: Bindings;
  var twitterApi: TwitterApi;
}

export {};
