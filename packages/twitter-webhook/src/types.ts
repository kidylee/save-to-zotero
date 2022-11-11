export interface TweetCreateEvent {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  in_reply_to_status_id?: number;
  in_reply_to_status_id_str?: string;
  in_reply_to_user_id?: number;
  in_reply_to_user_id_str?: string;
  user: {
    id: number;
    id_str: string;
    name: string;
    screen_name: string;
  };
}

export interface DirectMessageEvent {
  type: "message_create";
  id: string;
  created_timestamp: string;
  message_create: {
    target: {
      recipient_id: string;
    };
    sender_id: string;
    source_app_id: string;
    message_data: {
      text: string;
      entities: {
        hashtags: string[];
        symbols: string[];
        user_mentions: string[];
        urls: string[];
      };
    };
    quick_reply_response?: {
      type: string;
      metadata: string;
    };
  };
}

export interface AccountActivityWebhookEvent {
  for_user_id: string;
  is_blocked_by?: boolean;
  tweet_create_events?: TweetCreateEvent[];
  direct_message_events?: DirectMessageEvent[];
}

export interface Env {
  TWITTER_CONSUMER_SECRET: string;
}
