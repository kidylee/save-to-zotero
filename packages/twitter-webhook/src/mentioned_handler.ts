import {
  CreateZoteroItem,
  TweetCreateEvent,
  TwitterZoteroAPIValue,
} from "./types";
import { bindings, twitterApi } from "./index";
import { getDefaultCollectionKey } from "./get_default_collection_key";
import { createItem } from "./create_item";
import { createNote } from "./create_note";

export const handleMentionedTweets = async (dms: TweetCreateEvent[]) => {
  await Promise.all(dms.map(handleTweet));
};

const handleTweet = async (tweet: TweetCreateEvent) => {
  const { user } = tweet;
  const zoteroApiKey = await bindings!.TWITTER_ZOTERO_API_KV.get(user.id_str);

  if (zoteroApiKey == null) {
    await replyConnectTweet(tweet.id_str);
  }

  const zoteroAPIValue: TwitterZoteroAPIValue = JSON.parse(zoteroApiKey!);
  if (zoteroAPIValue.defaultCollectionKey == null) {
    zoteroAPIValue.defaultCollectionKey = await getDefaultCollectionKey(
      zoteroAPIValue.userID,
      zoteroAPIValue.oauth_token_secret
    );
    await bindings!.TWITTER_ZOTERO_API_KV.put(
      user.id_str,
      JSON.stringify(zoteroAPIValue)
    );
  }
  const enrichedTweet = await twitterApi!.enrichTweet(
    tweet.in_reply_to_status_id_str!
  );
  console.log("Conversation id:", enrichedTweet.data.conversation_id);

  const zoteroItem: CreateZoteroItem = {
    itemType: "forumPost",
    title: enrichedTweet.data.text,
    creators: [
      {
        creatorType: "author",
        name: `${enrichedTweet.includes!.users![0].name}[@${
          enrichedTweet.includes!.users![0].username
        }]`,
      },
    ],
    forumTitle: "Twitter",
    postType: "Tweet",
    url: `https://twitter.com/${
      enrichedTweet.includes!.users![0].username
    }/status/${enrichedTweet.data.id}`,
    date: enrichedTweet.data.created_at,
    collections: [zoteroAPIValue.defaultCollectionKey],
  };
  const itemId = await createItem(zoteroItem, zoteroAPIValue);

  //thread
  const thread = await twitterApi!.getThread(
    tweet.in_reply_to_user_id_str!,
    enrichedTweet.data.conversation_id
  );
  console.log("Thread:", thread);

  if (thread.data.length > 1) {
    const replies = thread.data.slice(0, thread.data.length - 1);
    const text: string = replies
      .reverse()
      .map((reply) => {
        return `<a href="https://twitter.com/${reply.author_id}/status/${reply.id}">https://twitter.com/${reply.author_id}/status/${reply.id}</a><br/>${reply.text}`.replace(
          "\n",
          "<br/>"
        );
      })
      .join("<br/><br/>");
    await createNote(
      { itemType: "note", note: text, parentItem: itemId },
      zoteroAPIValue
    );
  }
  await replySuccess(tweet.id_str);
};

const replyConnectTweet = async (tweetId: string) => {
  await twitterApi!.replyTweet(
    tweetId,
    "Sorry, I'm not able to find your Zotero information, please DM me or use below button to set it up.\n https://twitter.com/messages/compose?recipient_id=1568787574734606337"
  );
};

const replySuccess = async (tweetId: string) => {
  await twitterApi!.replyTweet(tweetId, "Saved!");
};
