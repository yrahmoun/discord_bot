const getPreviousUser = async (message) => {
  const messages = await message.channel.messages.fetch({ limit: 2 });
  const msgArray = Array.from(messages.values());

  const prevUser = msgArray[1].author.username;
  return prevUser;
};

module.exports = getPreviousUser;
