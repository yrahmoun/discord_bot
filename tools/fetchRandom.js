const fetchRandom = async (message) => {
  const guild = message.guild;
  if (!guild) return;

  try {
    await guild.members.fetch();

    const members = guild.members.cache;
    const randomMember = members.random();

    if (!randomMember) {
      message.channel.send("❌ No members found.");
      return;
    }

    const username = randomMember.user.username;
    return username;
  } catch (error) {
    console.error(error);
    message.channel.send("❌ Failed to fetch random user.");
  }
};

module.exports = fetchRandom;
