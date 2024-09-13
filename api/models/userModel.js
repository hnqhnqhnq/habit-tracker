const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
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
  createdAt: {
    type: Date,
  },
  profilePicture: {
    type: String,
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

  this.resetTokenExpirationDate = new Date() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
