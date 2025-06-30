const roll = (message) => {
  const wordCount = message.content.split(/\s+/).length;
  if (wordCount > 2) return;
  const msg = message.content.trim();
  const max = msg.split("d")[1];
  const num = parseInt(max);
  console.log(num);
  if (isNaN(num) || num <= 0) {
    message.channel.send("❌ Please send a valid number");
    return;
  }
  const roll = Math.floor(Math.random() * num) + 1;
  message.channel.send(`🎲 You have rolled: ${roll}`);
};

module.exports = roll;
