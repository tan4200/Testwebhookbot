import express from "express";
import { Bot, webhookCallback } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN);
const app = express();

// Basic command
bot.command("start", (ctx) => ctx.reply("Hello from grammY bot via webhook!"));

// Attach grammY webhook to Express
app.use("/webhook", webhookCallback(bot, "express"));

// Start server and set webhook
app.listen(3000, async () => {
  console.log("Server running");

  const webhookUrl = process.env.RENDER_EXTERNAL_URL + "/webhook";
  await bot.api.setWebhook(webhookUrl);

  console.log("Webhook set to:", webhookUrl);
});
