const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { Habit } = require("./../models/habitModel");

exports.getCurrentUserProfile = catchAsync(async (req, res, next) => {
  const currentUser = req.user;

  res.status(200).json({
    status: "success",
    data: {
      user: currentUser,
    },
  });
});

exports.getUserHabits = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  if (!userId) {
    return next(new AppError("User ID must be provided.\n", 400));
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User could not be found.\n", 404));
  }

  const habits = user.habits || [];
  console.log(habits);

  res.status(200).json({
    status: "success",
    length: habits.length,
    data: {
      habits,
    },
  });
});

exports.createHabit = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  if (!userId) {
    return next(new AppError("User ID must be provided.\n", 400));
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User could not be found.\n", 404));
  }

  const newHabit = await Habit.create({
    name: req.body.name,
    description: req.body.description,
    targetValue: req.body.targetValue,
  });

  if (!newHabit) {
    return next(new AppError("Habit could not be created,\n", 400));
  }

  user.habits.push(newHabit);
  await user.save();

  res.status(201).json({
    status: "success",
    data: {
      newHabit,
    },
  });
});
