const Triggers = require("../models/triggerModel");

const assignTrigger = async (message) => {
  const msg = message.content;
  const parts = msg.split("==");

  if (parts.length !== 2) return;
  if (!message.member.permissions.has("Administrator")) {
    message.channel.send("❌ Only admins can create triggers.");
    return;
  }

  const trigger = parts[0].trim();
  const response = parts[1].trim();

  try {
    await Triggers.findOneAndUpdate(
      { trigger },
      { response },
      { upsert: true }
    );
  } catch (error) {
    message.channel.send("❌ Failed to create trigger.");
    console.error(error);
    return;
  }

  message.channel.send("✅ Message has been successfully saved.");
};

module.exports = assignTrigger;
