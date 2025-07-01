const Triggers = require("../models/triggerModel");

const deleteResponse = async (message) => {
  const msg = message.content;
  const parts = msg.split("-=");

  if (parts.length !== 2) return;
  if (!message.member.permissions.has("Administrator")) {
    message.channel.send("❌ Only admins can delete triggers.");
    return;
  }

  const trigger = parts[0].trim();
  const response = parts[1].trim();

  try {
    const triggerDoc = await Triggers.findOne({ trigger });
    if (!triggerDoc) {
      message.channel.send("❌ Trigger is not in use.");
      return;
    }
    if (!triggerDoc.response.includes(response)) {
      message.channel.send("❌ The following response has not been found.");
      return;
    }

    await Triggers.findOneAndUpdate(
      { trigger },
      { $pull: { response: response } }
    );
  } catch (error) {
    message.channel.send("❌ Failed to delete response.");
    console.error(error);
    return;
  }

  message.channel.send("✅ Response has been successfully deleted.");
};

module.exports = deleteResponse;
