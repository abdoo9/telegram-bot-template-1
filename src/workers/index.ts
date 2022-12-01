import { Worker } from "bullmq";
import { Bot } from "~/bot";
import { createGreetingWorker } from "./greeting.worker";

const workers: Worker[] = [];

export const startWorkers = (bot: Bot) => {
  workers.push(createGreetingWorker(bot));
};

export const stopWorkers = async () =>
  Promise.all(workers.map((w) => w.close()));
