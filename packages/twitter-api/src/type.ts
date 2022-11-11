import { Tweet } from "./twitter";

export interface ConversationDistributionTask {
  conversationId: string;
  mentionedTweets: Tweet[];
}

export interface DMMessageData {
  text: string;
  quick_reply?: {
    type: string;
    options: [
      {
        label: string;
        description: string;
        metadata: string;
      }
    ];
  };
}
