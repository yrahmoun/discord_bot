const Triggers = require("../models/triggerModel");

const checkExist = async (message) => {
  const trigger = message.content.trim();

  try {
    const exist = await Triggers.findOne({ trigger });
    return !!exist;
  } catch (error) {
    console.error(error);
  }
};

module.exports = checkExist;
