const mongoose = require("mongoose");

const habitSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the habit.\n"],
  },
  description: {
    type: String,
  },
  currentValue: {
    type: Number,
    default: 0,
  },
  targetValue: {
    type: Number,
    required: [true, "Please provide a daily target for your habit.\n"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = {
  habitSchema,
  Habit,
};
