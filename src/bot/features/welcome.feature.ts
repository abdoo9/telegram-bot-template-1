import { Composer } from "grammy";

import { Context } from "~/bot/types";
import { logHandle } from "~/bot/helpers/logging";
import { greetingQueue } from "~/queues";

export const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("start", logHandle("command-start"), async (ctx) => {
  await greetingQueue.add("welcome", {
    chatId: ctx.chat.id,
  });
});
