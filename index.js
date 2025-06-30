const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const getPreviousUser = require("./tools/getPreviousUser");
const roll = require("./tools/roll");
const assignTrigger = require("./tools/assignTrigger");
const mongoose = require("mongoose");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, //Lets the bot know about servers it joins
    GatewayIntentBits.GuildMessages, //Lets the bot receive messages sent in servers
    GatewayIntentBits.MessageContent, //Lets the bot read the actual message text (e.g., "!ping")
  ],
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("databse connected");
  })
  .catch((error) => {
    console.error(error);
  });

const TOKEN = process.env.TOKEN;

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const displayName = message.member
    ? message.member.displayName
    : message.author.username;

  if (message.content === "ping") {
    message.channel.send("🏓 Pong!");
  }

  if (message.content === "hi") {
    message.channel.send(`Hello, ${displayName}`);
  }

  const prevUser = await getPreviousUser(message);

  if (message.content === "prev") {
    message.channel.send(
      `The previous user to talk before you is: ${prevUser}`
    );
  }

  if (message.content.includes("roll d")) {
    roll(message);
  }

  if (message.content.includes(" == ")) {
    assignTrigger(message);
  }
});

client.login(TOKEN);
