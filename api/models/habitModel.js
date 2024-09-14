const mongoose = require("mongoose");

const habitSchema = mongoose.Schema(
  {
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
    dailyTargetValue: {
      type: Number,
      required: [true, "Please provide a daily target for your habit.\n"],
    },
    dailyStreak: {
      type: Number,
      default: 0,
    },
    timer: {
      type: Number,
      default: 1500000, // ms
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

habitSchema.virtual("timerInMinutes").get(function () {
  return this.timer / 1000 / 60;
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = {
  habitSchema,
  Habit,
};
