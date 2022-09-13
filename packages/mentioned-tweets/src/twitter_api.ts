import {MentionedResponse} from "../../types";

export async function api<T>(url: string): Promise<T> {
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${globalThis.env.TWITTER_BEARER}`,
        },
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}


export const getLastPage = async (
    sinceId?: string | null,
    response?: MentionedResponse
): Promise<MentionedResponse | undefined> => {
    if (!response) {
        const page = await getMentioned();
        return await getLastPage(sinceId, page);
    }
    if (!response.meta.next_token) {
        return response;
    }

    if (response.meta.next_token) {
        return await getLastPage(
            sinceId,
            await getMentioned(sinceId, response.meta.next_token)
        );
    }
    return response;
};

export async function getMentioned(
    sinceId?: string | null,
    pagination_token?: string
): Promise<MentionedResponse> {
    return await api<MentionedResponse>(
        getMentionedURL(sinceId, pagination_token)
    );
}

export function getMentionedURL(
    sinceId?: string | null,
    pagination_token?: string
): string {
    const url = new URL(
        `https://api.twitter.com/2/users/${env.TWITTER_ACCOUNT}/mentions`
    );
    url.searchParams.append("max_results", process.env.MAX_RESULTS ?? "20");
    url.searchParams.append("tweet.fields", "conversation_id");

    if (sinceId) {
        url.searchParams.append("since_id", sinceId);
    }
    if (pagination_token) {
        url.searchParams.append("pagination_token", pagination_token);
    }

    return url.toString();
}

/**
 * return a map, key is conversation id, value is list of twitter ids
 * @param resp
 */
export const getConversationTasks = (
    resp: MentionedResponse
): ConversationDistributionTask[] => {
    const map = new Map<string, ConversationDistributionTask>();
    resp.data.forEach((tweet) => {
        if (!map.has(tweet.conversation_id)) {
            map.set(tweet.conversation_id, {
                conversationId: tweet.conversation_id,
                tweetIds: [],
            });
        }
        map.get(tweet.conversation_id)?.tweetIds.push(tweet.author_id);
    });
    return Array.from(map.values());
};

interface ConversationDistributionTask {
    conversationId: string;
    tweetIds: string[];
}
