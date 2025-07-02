const Triggers = require("../models/triggerModel");
const formatResponse = require("./formatResponse");

const fetchResponse = async (message) => {
  const trigger = message.content.trim();

  try {
    const doc = await Triggers.findOne({ trigger });
    if (!doc || !doc.response || doc.response.length === 0) {
      return;
    }
    const count = doc.response.length;
    const random = Math.floor(Math.random() * count);
    const response = doc.response[random];
    const reply = await formatResponse(message, response);
    message.channel.send(reply);
  } catch (error) {
    message.channel.send("❌ Failed to fetch response.");
    console.error(error);
  }
};

module.exports = fetchResponse;
