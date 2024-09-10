const { promisify } = require("util");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1000 * 60 * 60 * 24
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.setHeader("Cache-Control", "no-store");
  res.status(statusCode).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.protect = async (req, res, next) => {
  try {
    if (!req.cookies || !req.cookies.jwt) {
      throw new Error("User not logged in!");
    }

    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("No user!");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(404).json({
      status: "error",
      data: {
        message: err.message,
      },
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const createdUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    if (!createdUser) {
      throw new Error("No user created!");
    }

    createSendToken(createdUser, 201, res);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      data: {
        err,
      },
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Enter all credentials");
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error("Invalid email or password");
    }

    createSendToken(user, 201, res);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      data: {
        message: err.message,
      },
    });
  }
};

exports.signout = async (req, res) => {
  console.log("hit");
  res.cookie("jwt", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully!",
  });
};
