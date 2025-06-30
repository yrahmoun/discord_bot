const Triggers = require("../models/triggerModel");

const fetchResponse = async (message) => {
  const trigger = message.content.trim();

  try {
    const doc = await Triggers.findOne({ trigger });
    if (!doc || !doc.response || doc.response.length === 0) {
      return;
    }
    const count = doc.response.length;
    const random = Math.floor(Math.random() * count);
    message.channel.send(doc.response[random]);
  } catch (error) {
    message.channel.send("❌ Failed to fetch response.");
    console.error(error);
  }
};

module.exports = fetchResponse;
