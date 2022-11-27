import { getZoteroTemporaryCode } from "../src/getZoteroTemporaryCode";
import { TwitterResponse } from "../../twitter-api";
describe("scheduled", () => {
  it("should run", async () => {
    const result = await getZoteroTemporaryCode();
    console.log(result);
  });

  it("response process", async () => {
    console.log(searchResponse.data.at(-1));
  });
});

const searchResponse = {
  data: [
    {
      in_reply_to_user_id: "9011502",
      created_at: "2022-11-26T10:08:48.000Z",
      referenced_tweets: [
        {
          type: "replied_to",
          id: "1596445858332958720",
        },
      ],
      edit_history_tweet_ids: ["1596445860954447872"],
      id: "1596445860954447872",
      text: "• You can get started with my free handbooks on https://t.co/r9qqFKbS6t\n• Each year I organize a coding bootcamp https://t.co/V5VCDZLXpq. Next edition starts in January!",
    },
    {
      in_reply_to_user_id: "9011502",
      created_at: "2022-11-26T10:08:47.000Z",
      referenced_tweets: [
        {
          type: "replied_to",
          id: "1596445855531388931",
        },
      ],
      edit_history_tweet_ids: ["1596445858332958720"],
      id: "1596445858332958720",
      text: "• Practice using a rubber duck. Get a plastic duck or perhaps your cat or anything near your desk. When you hit a problem, explain the problem to the duck. Many times the problem resolves itself.\n• Walks or showers work wonders to fix problems. And sleep.\n• Have fun!",
    },
    {
      in_reply_to_user_id: "9011502",
      created_at: "2022-11-26T10:08:47.000Z",
      referenced_tweets: [
        {
          type: "replied_to",
          id: "1596445852901330944",
        },
      ],
      edit_history_tweet_ids: ["1596445855531388931"],
      id: "1596445855531388931",
      text: "• When recreating projects you see on YouTube or in a course, always try to add your own unique spin and features to it. Make it your own. This can be a project you then use as portfolio and show to prospective employers.",
    },
    {
      in_reply_to_user_id: "9011502",
      created_at: "2022-11-26T10:08:46.000Z",
      referenced_tweets: [
        {
          type: "replied_to",
          id: "1596445850330284032",
        },
      ],
      edit_history_tweet_ids: ["1596445852901330944"],
      id: "1596445852901330944",
      text: "• Motivation and curiosity are the best tools in your arsenal\n• Find a community. It’s more fun with peers.\n• We have many different languages. Different people like different languages. Also, different languages let you do different things.",
    },
    {
      in_reply_to_user_id: "9011502",
      created_at: "2022-11-26T10:08:45.000Z",
      referenced_tweets: [
        {
          type: "replied_to",
          id: "1596445847767592961",
        },
      ],
      edit_history_tweet_ids: ["1596445850330284032"],
      id: "1596445850330284032",
      text: "• It’s ok to use Google for every little problem you have, searching for a solution. Programmers share every problem and solution online, and if they didn’t, everyone would be challenged by the same issues. Instead, they share the solutions so you can go on with your day",
    },
    {
      in_reply_to_user_id: "9011502",
      created_at: "2022-11-26T10:08:45.000Z",
      referenced_tweets: [
        {
          type: "replied_to",
          id: "1596445845255168000",
        },
      ],
      edit_history_tweet_ids: ["1596445847767592961"],
      id: "1596445847767592961",
      text: "• Learn from different sources\n• Don’t focus too much on tools\n• Don’t think you need a degree and that you won’t become a developer without a degree.\n• Everyone makes mistakes. Mistakes are part of the learning process.",
    },
    {
      in_reply_to_user_id: "9011502",
      created_at: "2022-11-26T10:08:44.000Z",
      referenced_tweets: [
        {
          type: "replied_to",
          id: "1596445842784690176",
        },
      ],
      edit_history_tweet_ids: ["1596445845255168000"],
      id: "1596445845255168000",
      text: "• Also, make tons of job applications because you might not find the best company for you right at the first try.\n• Skills apply across different programming languages\n• You never finish learning. you have to always stay up to date to avoid becoming obsolete",
    },
    {
      in_reply_to_user_id: "9011502",
      created_at: "2022-11-26T10:08:44.000Z",
      referenced_tweets: [
        {
          type: "replied_to",
          id: "1596445840310034433",
        },
      ],
      edit_history_tweet_ids: ["1596445842784690176"],
      id: "1596445842784690176",
      text: "• Find a way to stay consistent. For example every day at 6AM you spend 1 hour learning programming. Make it a habit.\n• Don’t wait until you check all the boxes in a job ad to apply. You never know.",
    },
    {
      in_reply_to_user_id: "9011502",
      created_at: "2022-11-26T10:08:43.000Z",
      referenced_tweets: [
        {
          type: "replied_to",
          id: "1596445837831245825",
        },
      ],
      edit_history_tweet_ids: ["1596445840310034433"],
      id: "1596445840310034433",
      text: "• Don’t be afraid that it looks too simple and not enough “engineered”\n• Work on little projects that are interesting to you. Work on lots of projects. Quantity and spending tons of hours exposing yourself to different things is brute-forcing learning",
    },
    {
      in_reply_to_user_id: "9011502",
      created_at: "2022-11-26T10:08:42.000Z",
      referenced_tweets: [
        {
          type: "replied_to",
          id: "1596445835272736773",
        },
      ],
      edit_history_tweet_ids: ["1596445837831245825"],
      id: "1596445837831245825",
      text: "• Start by understanding the problem. Once you understand the problem, coding is the easy part.\n• Simple is better than complex. Don’t write code for a future that might never exist. Simple code working now is better than complex code that might work for a future scenario.",
    },
    {
      in_reply_to_user_id: "9011502",
      created_at: "2022-11-26T10:08:42.000Z",
      referenced_tweets: [
        {
          type: "replied_to",
          id: "1596445832726749184",
        },
      ],
      edit_history_tweet_ids: ["1596445835272736773"],
      id: "1596445835272736773",
      text: "• When doing tutorials, type the code. Don’t do copy/paste. Subtle but big difference. The code will be yours\n• You learn by doing, not by watching other people do. Find a problem, even a simple one. Use code to create a solution. Create tons of little websites/apps.",
    },
    {
      in_reply_to_user_id: "9011502",
      created_at: "2022-11-26T10:08:41.000Z",
      referenced_tweets: [
        {
          type: "replied_to",
          id: "1596445830159876096",
        },
      ],
      edit_history_tweet_ids: ["1596445832726749184"],
      id: "1596445832726749184",
      text: "• Be patient. you won’t learn quickly. it will take time.\n• Listen to all the advice, but don’t follow all the advice\n• Try to ignore too much enthusiasm (hype) on some tools and too much negativity about other tools as well",
    },
  ],
  includes: {
    users: [
      {
        id: "9011502",
        name: "flavio",
        username: "flaviocopes",
      },
    ],
    tweets: [
      {
        in_reply_to_user_id: "9011502",
        created_at: "2022-11-26T10:08:47.000Z",
        referenced_tweets: [
          {
            type: "replied_to",
            id: "1596445855531388931",
          },
        ],
        edit_history_tweet_ids: ["1596445858332958720"],
        id: "1596445858332958720",
        text: "• Practice using a rubber duck. Get a plastic duck or perhaps your cat or anything near your desk. When you hit a problem, explain the problem to the duck. Many times the problem resolves itself.\n• Walks or showers work wonders to fix problems. And sleep.\n• Have fun!",
      },
      {
        in_reply_to_user_id: "9011502",
        created_at: "2022-11-26T10:08:47.000Z",
        referenced_tweets: [
          {
            type: "replied_to",
            id: "1596445852901330944",
          },
        ],
        edit_history_tweet_ids: ["1596445855531388931"],
        id: "1596445855531388931",
        text: "• When recreating projects you see on YouTube or in a course, always try to add your own unique spin and features to it. Make it your own. This can be a project you then use as portfolio and show to prospective employers.",
      },
      {
        in_reply_to_user_id: "9011502",
        created_at: "2022-11-26T10:08:46.000Z",
        referenced_tweets: [
          {
            type: "replied_to",
            id: "1596445850330284032",
          },
        ],
        edit_history_tweet_ids: ["1596445852901330944"],
        id: "1596445852901330944",
        text: "• Motivation and curiosity are the best tools in your arsenal\n• Find a community. It’s more fun with peers.\n• We have many different languages. Different people like different languages. Also, different languages let you do different things.",
      },
      {
        in_reply_to_user_id: "9011502",
        created_at: "2022-11-26T10:08:45.000Z",
        referenced_tweets: [
          {
            type: "replied_to",
            id: "1596445847767592961",
          },
        ],
        edit_history_tweet_ids: ["1596445850330284032"],
        id: "1596445850330284032",
        text: "• It’s ok to use Google for every little problem you have, searching for a solution. Programmers share every problem and solution online, and if they didn’t, everyone would be challenged by the same issues. Instead, they share the solutions so you can go on with your day",
      },
      {
        in_reply_to_user_id: "9011502",
        created_at: "2022-11-26T10:08:45.000Z",
        referenced_tweets: [
          {
            type: "replied_to",
            id: "1596445845255168000",
          },
        ],
        edit_history_tweet_ids: ["1596445847767592961"],
        id: "1596445847767592961",
        text: "• Learn from different sources\n• Don’t focus too much on tools\n• Don’t think you need a degree and that you won’t become a developer without a degree.\n• Everyone makes mistakes. Mistakes are part of the learning process.",
      },
      {
        in_reply_to_user_id: "9011502",
        created_at: "2022-11-26T10:08:44.000Z",
        referenced_tweets: [
          {
            type: "replied_to",
            id: "1596445842784690176",
          },
        ],
        edit_history_tweet_ids: ["1596445845255168000"],
        id: "1596445845255168000",
        text: "• Also, make tons of job applications because you might not find the best company for you right at the first try.\n• Skills apply across different programming languages\n• You never finish learning. you have to always stay up to date to avoid becoming obsolete",
      },
      {
        in_reply_to_user_id: "9011502",
        created_at: "2022-11-26T10:08:44.000Z",
        referenced_tweets: [
          {
            type: "replied_to",
            id: "1596445840310034433",
          },
        ],
        edit_history_tweet_ids: ["1596445842784690176"],
        id: "1596445842784690176",
        text: "• Find a way to stay consistent. For example every day at 6AM you spend 1 hour learning programming. Make it a habit.\n• Don’t wait until you check all the boxes in a job ad to apply. You never know.",
      },
      {
        in_reply_to_user_id: "9011502",
        created_at: "2022-11-26T10:08:43.000Z",
        referenced_tweets: [
          {
            type: "replied_to",
            id: "1596445837831245825",
          },
        ],
        edit_history_tweet_ids: ["1596445840310034433"],
        id: "1596445840310034433",
        text: "• Don’t be afraid that it looks too simple and not enough “engineered”\n• Work on little projects that are interesting to you. Work on lots of projects. Quantity and spending tons of hours exposing yourself to different things is brute-forcing learning",
      },
      {
        in_reply_to_user_id: "9011502",
        created_at: "2022-11-26T10:08:42.000Z",
        referenced_tweets: [
          {
            type: "replied_to",
            id: "1596445835272736773",
          },
        ],
        edit_history_tweet_ids: ["1596445837831245825"],
        id: "1596445837831245825",
        text: "• Start by understanding the problem. Once you understand the problem, coding is the easy part.\n• Simple is better than complex. Don’t write code for a future that might never exist. Simple code working now is better than complex code that might work for a future scenario.",
      },
      {
        in_reply_to_user_id: "9011502",
        created_at: "2022-11-26T10:08:42.000Z",
        referenced_tweets: [
          {
            type: "replied_to",
            id: "1596445832726749184",
          },
        ],
        edit_history_tweet_ids: ["1596445835272736773"],
        id: "1596445835272736773",
        text: "• When doing tutorials, type the code. Don’t do copy/paste. Subtle but big difference. The code will be yours\n• You learn by doing, not by watching other people do. Find a problem, even a simple one. Use code to create a solution. Create tons of little websites/apps.",
      },
      {
        in_reply_to_user_id: "9011502",
        created_at: "2022-11-26T10:08:41.000Z",
        referenced_tweets: [
          {
            type: "replied_to",
            id: "1596445830159876096",
          },
        ],
        edit_history_tweet_ids: ["1596445832726749184"],
        id: "1596445832726749184",
        text: "• Be patient. you won’t learn quickly. it will take time.\n• Listen to all the advice, but don’t follow all the advice\n• Try to ignore too much enthusiasm (hype) on some tools and too much negativity about other tools as well",
      },
      {
        created_at: "2022-11-26T10:08:41.000Z",
        edit_history_tweet_ids: ["1596445830159876096"],
        id: "1596445830159876096",
        text: "I worked as a Web Developer for the past 15 years.\nI love being a Web Developer. I wouldn't do anything else.\nHere are my 26 top tips for new and aspiring Web Developers 👇",
      },
    ],
  },
  meta: {
    newest_id: "1596445860954447872",
    oldest_id: "1596445832726749184",
    result_count: 12,
  },
};
