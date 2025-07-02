const Groq = require("groq-sdk");
const Triggers = require("../models/triggerModel");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const systemMessage = async () => {
  try {
    const trigger = "bot role";
    const botName = process.env.BOT_NAME;
    const msg = await Triggers.findOne({ trigger });
    if (!msg) {
      return `You are a helpful discord bot called ${botName}.`;
    }
    return msg.response[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

async function aiReply(message) {
  try {
    const response = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content: await systemMessage(),
        },
        { role: "user", content: message.content },
      ],
    });
    const result = response.choices[0].message;
    message.channel.send(result.content);
  } catch (error) {
    console.error("Error fetching response:", error);
  }
}

module.exports = aiReply;
