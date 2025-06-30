const Triggers = require("../models/triggerModel");

const deleteTrigger = async (message) => {
  const msg = message.content;
  const parts = msg.split(" ");
  const trigger = parts.slice(1).join(" ").trim();

  if (parts.length < 2) return;
  if (!message.member.permissions.has("Administrator")) {
    message.channel.send("❌ Only admins can delete triggers.");
    return;
  }

  try {
    await Triggers.findOneAndDelete({ trigger });
  } catch (error) {
    message.channel.send("❌ Failed to delete trigger.");
    console.error(error);
    return;
  }

  message.channel.send("✅ Trigger has been successfully deleted.");
};

module.exports = deleteTrigger;
