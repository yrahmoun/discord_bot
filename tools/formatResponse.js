const getPreviousUser = require("./getPreviousUser");
const fetchRandom = require("./fetchRandom");

const formatResponse = async (message, res) => {
  const values = {
    "%n": message.member.displayName,
    "%p": await getPreviousUser(message),
    "%rn": await fetchRandom(message),
  };

  for (let key in values) {
    res = res.replaceAll(key, values[key]);
  }

  res = res.replace(/%\{([^}]+)\}/g, (match, options) => {
    const choices = options.split(",").map((option) => option.trim());
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    return randomChoice;
  });

  res = res.replace(/%(\d+)/g, (match, max) => {
    const limit = parseInt(max);
    if (isNaN(limit) || limit <= 0) return match;
    const randomNum = Math.floor(Math.random() * limit) + 1;
    return randomNum;
  });

  return res;
};

module.exports = formatResponse;
