export interface Tweet {
  id: string;
  author_id: string;
  text: string;
  conversation_id: string;
  created_at: string;
  in_reply_to_user_id: string;
}

export interface TwitterResponse {
  data: Tweet[];
  meta: ResponseMeta;
  includes?: Expansions;
}
interface Expansions {
  tweets: Tweet[];
}
interface ResponseMeta {
  next_token: string | null;
  result_count: number;
  newest_id: string;
  oldest_id: string;
}
