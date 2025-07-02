const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const getPreviousUser = require("./tools/getPreviousUser");
const roll = require("./tools/roll");
const assignTrigger = require("./tools/assignTrigger");
const checkExist = require("./tools/checkExist");
const fetchResponse = require("./tools/fetchResponse");
const deleteTrigger = require("./tools/deleteTrigger");
const addResponse = require("./tools/addResponse");
const deleteResponse = require("./tools/deleteResponse");
const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("Bot is running"));
app.listen(3000);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, //Lets the bot know about servers it joins
    GatewayIntentBits.GuildMessages, //Lets the bot receive messages sent in servers
    GatewayIntentBits.MessageContent, //Lets the bot read the actual message text (e.g., "!ping")
    GatewayIntentBits.GuildMembers, // Required to access member info
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

  const displayName = message.member.displayName;

  if (await checkExist(message)) {
    return await fetchResponse(message);
  }

  if (message.content.includes("delete")) {
    return await deleteTrigger(message);
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

  if (message.content.includes(" += ")) {
    addResponse(message);
  }

  if (message.content.includes(" -= ")) {
    deleteResponse(message);
  }
});

client.login(TOKEN);
