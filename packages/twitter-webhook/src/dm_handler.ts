import { DirectMessageEvent } from "./types";
import { twitterApi } from "./index";
export const handleDMs = async (dms: DirectMessageEvent[]) => {
  await Promise.all(dms.map(handleDM));
};

const handleDM = async (dm: DirectMessageEvent) => {
  if (dm.message_create.quick_reply_response == null) {
    await sendUseQuickReplyDM(dm.message_create.sender_id);
  }

  if (dm.message_create.quick_reply_response?.metadata == "connect") {
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
