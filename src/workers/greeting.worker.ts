import { Worker } from "bullmq";
import { Bot } from "~/bot";
import { i18n } from "~/bot/i18n";
import { connection } from "~/redis";
import { usersService } from "~/services";
import { GreetingData, greetingQueue } from "~/queues";

export const createGreetingWorker = (bot: Bot) =>
  new Worker<GreetingData>(
    greetingQueue.name,
    async (job) => {
      const user = await usersService.findByTelegramId(job.data.chatId, {
        select: {
          languageCode: true,
        },
      });

      if (user) {
        await bot.api.sendMessage(
          job.data.chatId,
          i18n.t(user.languageCode || "en", "welcome")
        );
      }
    },
    {
      connection,
    }
  );
