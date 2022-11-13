import { TweetCreateEvent } from "./types";
import { bindings, twitterApi } from "./index";

export const handleMentionedTweets = async (dms: TweetCreateEvent[]) => {
  await Promise.all(dms.map(handleTweet));
};

const handleTweet = async (tweet: TweetCreateEvent) => {
  const { user } = tweet;
  const zoteroId = await bindings!.TWITTER_ZOTERO_API_KV.get(user.id_str);

  if (zoteroId === null) {
    await replyConnectTweet(tweet.id_str, user.id_str);
  }
};

const replyConnectTweet = async (tweetId: string, userId: string) => {
  await twitterApi!.replyTweet(
    tweetId,
    "Sorry, I'm not able to find your Zotero information, please DM me or use below button to set it up.\n https://twitter.com/messages/compose?recipient_id=1568787574734606337"
  );
};
