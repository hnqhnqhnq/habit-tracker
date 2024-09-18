const mongoose = require("mongoose");

const statSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  statDate: {
    type: Date,
    default: Date.now(),
  },
  pendingHabits: {
    type: Number,
    required: true,
  },
  completedHabits: {
    type: Number,
    required: true,
  },
  totalHabits: {
    type: Number,
    required: true,
  },
});

// Methods

// Update stat
statSchema.methods.updateStat = async function ({ ...options }) {
  if (options.habitsForTodayLength !== undefined) {
    this.totalHabits = options.habitsForTodayLength;
    this.pendingHabits = options.habitsForTodayLength;
  }

  if (options.checkedHabitsForTodayLength !== undefined) {
    this.pendingHabits =
      this.pendingHabits - options.checkedHabitsForTodayLength;
    this.completedHabits = options.checkedHabitsForTodayLength;
  }

  await this.save();
};

const Stat = mongoose.model("Stat", statSchema);

module.exports = Stat;
