const mongoose = require("mongoose");

const habitSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the habit.\n"],
  },
  description: {
    type: String,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  days: {
    type: [String],
    enum: [
      "All Days",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: [true, "Please select when to do the habit.\n"],
  },
  color: {
    type: String,
    required: [true, "Please provide a colod for habit.\n"],
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
