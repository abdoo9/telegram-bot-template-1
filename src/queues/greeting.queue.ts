import { Queue } from "bullmq";
import { connection } from "~/redis";

export type GreetingData = {
  chatId: number;
};

export const greetingQueue = new Queue<GreetingData>("greeting", {
  connection,
});
