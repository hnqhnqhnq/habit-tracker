const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const { habitSchema } = require("./habitModel");

// User model
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your first name.\n"],
    validate: [validator.isAlpha, "Please tell us your first name.\n"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name.\n"],
    validate: [validator.isAlpha, "Please tell us your last name.\n"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email address.\n"],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email address./n"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm the password.\n"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same.\n",
    },
    select: false,
  },
  passwordChangedAt: {
    type: Date,
  },
  habits: {
    type: [habitSchema],
  },
  dailyStreak: {
    type: Number,
    default: 0,
  },
  lastStreakUpdate: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
  },
  resetToken: {
    type: String,
    select: false,
  },
  resetTokenExpirationDate: {
    type: Date,
    select: false,
  },
});

// Document middleware

// Password encryption
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

// Created at
userSchema.pre("save", function (next) {
  if (!this.isNew) {
    return next();
  }

  this.createdAt = new Date();

  next();
});

// Password changed at
userSchema.pre("save", function (next) {
  if (!this.isNew && this.isModified("password")) {
    this.passwordChangedAt = new Date();
    return next();
  }

  next();
});

// Methods

// Verify password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Create reset token
userSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  if (process.env.NODE_ENV === "development") {
    console.log({ resetToken }, this.passwordResetToken);
  }

  this.resetTokenExpirationDate = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Get habits based on a filtering using week days
userSchema.methods.getAllHabitsForAWeekDay = function (query) {
  const days = Object.keys(query);
  const habits = this.habits.filter((habit) => {
    let ok = false;

    for (const day of days) {
      if (habit.days.includes(day) || habit.days.includes("All Days")) {
        ok = true;
      }
    }

    return ok;
  });

  return habits;
};

// Get current week day's habits
userSchema.methods.getHabitsForToday = function () {
  const today = moment().format("dddd");
  const habits = this.habits.filter((habit) => {
    return habit.days.includes(today) || habit.days.includes("All Days");
  });

  return habits;
};

// Reset checking state each day
userSchema.methods.resetCheckedHabits = async function () {
  const currentDate = moment().startOf("day");

  this.habits.forEach((habit) => {
    if (habit.lastChecked) {
      const lastCheckedDate = moment(habit.lastChecked).startOf("day");

      if (currentDate.isAfter(lastCheckedDate)) {
        habit.checked = false;
      }
    }
  });

  await this.save();
};

// Update user daily streak with increment or not
userSchema.methods.updateDailyStreak = async function (increment = true) {
  const today = moment().startOf("day");
  const lastStreakDate = this.lastStreakUpdate
    ? moment(this.lastStreakUpdate).startOf("day")
    : null;

  console.log(today, lastStreakDate);

  if (lastStreakDate) {
    const daysDifference = today.diff(lastStreakDate, "days");
    console.log(daysDifference);
    if (daysDifference === 0) {
      return;
    } else if (daysDifference === 1) {
      if (increment) {
        this.dailyStreak += 1;
        this.lastStreakUpdate = today.toDate();
      }
    } else {
      this.dailyStreak = 1;
      this.lastStreakUpdate = today.toDate();
    }
  } else {
    if (increment) {
      this.dailyStreak = 1;
      this.lastStreakUpdate = today.toDate();
    }
  }

  await this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
