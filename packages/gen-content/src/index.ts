import { ConversationDistributionTask } from "@save-to-zotero/twitter-api";

export const processTasks = async (tasks: ConversationDistributionTask[]) => {
  for (const task of tasks) {
    console.log(task);
  }
};
export const worker = {
  async fetch(request: Request) {
    if (request.method === "POST") {
      if (request.body) {
        const tasks: ConversationDistributionTask[] = await request.json();
        console.log(tasks);
      }
      return new Response("ok");
    }

    let response = new Response(null, { status: 403 });
    return response;
  },
};

export default worker;
