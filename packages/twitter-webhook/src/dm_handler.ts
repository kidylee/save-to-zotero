import { v4 as uuidv4 } from "uuid";
import { DirectMessageEvent } from "./types";
import { bindings, twitterApi } from "./index";

export const handleDMs = async (dms: DirectMessageEvent[]) => {
  await Promise.all(dms.map(handleDM));
};

async function sendConnectedDM(userId: string) {
  await twitterApi!.sendDM(
    {
      text: "You have connected to Zotero already, do you want to disconnect?",
      quick_reply: {
        type: "options",
        options: [
          {
            label: "Disconnect from Zotero",
            description: "Click me to start disconnect from Zotero",
            metadata: "disconnect",
          },
        ],
      },
    },
    userId
  );
}

const handleDM = async (dm: DirectMessageEvent) => {
  if (dm.message_create.message_data.quick_reply_response == null) {
    await sendUseQuickReplyDM(dm.message_create.sender_id);
  }

  if (
    dm.message_create.message_data.quick_reply_response?.metadata === "connect"
  ) {
    const senderId = await bindings?.TWITTER_ZOTERO_API_KV.get(
      dm.message_create.sender_id
    );
    if (senderId) {
      await sendConnectedDM(dm.message_create.sender_id);
      return;
    }

    const applicationId = uuidv4().toString();
    await bindings!.TWITTER_ZOTERO_CONNECTING_KV.put(
      applicationId,
      dm.message_create.sender_id,
      { expirationTtl: 60 * 60 }
    );

    await twitterApi!.sendDM(
      {
        text: `Please below link to connect to Zotero:\n\nhttps://zotero-auth.savetozotero.workers.dev/connect?applicationId=${applicationId} `,
      },
      dm.message_create.sender_id
    );
  }
};

const sendUseQuickReplyDM = async (userId: string) => {
  await twitterApi!.sendDM(
    {
      text: "Please use quick reply down below, sorry for the inconvenience.",
      quick_reply: {
        type: "options",
        options: [
          {
            label: "Connect to Zotero",
            description: "Click me to start connecting to Zotero",
            metadata: "connect",
          },
        ],
      },
    },
    userId
  );
};
