import {Tweet} from "./twitter";

export interface ConversationDistributionTask {
    conversationId: string;
    mentionedTweets: Tweet[];
}
