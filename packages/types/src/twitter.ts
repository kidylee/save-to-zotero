export interface Tweet {
    id: string;
    author_id: string;
    text: string;
    conversation_id: string;
    created_at: string;
}

export interface MentionedResponse {
    data: Tweet[];
    meta: ResponseMeta;
}

interface ResponseMeta {
    next_token: string | null;
    result_count: number;
    newest_id: string;
    oldest_id: string;
}
