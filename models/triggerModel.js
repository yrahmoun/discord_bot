const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const triggerSchema = new Schema({
  trigger: {
    type: String,
    required: true,
    trim: true,
  },
  response: {
    type: [String],
    required: true,
    trim: true,
  },
});

const Triggers = mongoose.model("Triggers", triggerSchema);
module.exports = Triggers;
