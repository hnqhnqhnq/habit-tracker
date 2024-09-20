const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { Habit } = require("./../models/habitModel");
const statController = require("./statController");

exports.getCurrentUserProfile = catchAsync(async (req, res, next) => {
  const currentUser = req.user;
  await currentUser.updateDailyStreak(false);

  res.status(200).json({
    status: "success",
    data: {
      user: currentUser,
    },
  });
});

exports.getUserHabits = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  let habits;

  if (!userId) {
    return next(new AppError("User ID must be provided.\n", 400));
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User could not be found.\n", 404));
  }

  if (Object.keys(req.query).length === 0) {
    habits = user.habits || [];
  } else {
    habits = user.getAllHabitsForAWeekDay(req.query);
  }

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

  if (req.body.days.length === 0) {
    return next(new AppError("The habit must take place.\n", 400));
  }

  const newHabit = await Habit.create({
    name: req.body.name,
    description: req.body.description || "",
    days: req.body.days,
    color: req.body.color,
  });

  if (!newHabit) {
    return next(new AppError("Habit could not be created,\n", 400));
  }

  user.habits.push(newHabit);
  await user.save();
  const stats = await user.getStats(req, next);

  if (stats.length === 0) {
    await statController.createStat(req, res, next);
    stats = await user.getStats(req, next);
  }

  const habitsForToday = user.getHabitsForToday() || [];
  const checkedHabits = user.getCheckedHabits() || [];

  await stats[0].updateStat({
    habitsForTodayLength: habitsForToday.length,
    checkedHabitsForTodayLength: checkedHabits.length,
  });

  res.status(201).json({
    status: "success",
    data: {
      newHabit,
    },
  });
});

exports.updateHabit = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return next(new AppError("User not found.\n", 404));
  }

  const habit = await Habit.findById(req.params.habitId);
  if (!habit) {
    return next(new AppError("Habit not found.\n", 404));
  }

  if (req.body.name) habit.name = req.body.name;
  if (req.body.description) habit.description = req.body.description;
  if (req.body.days) {
    if (req.body.days.length === 0) {
      return next(new AppError("The habit must take place.\n", 400));
    }
    habit.days = [...req.body.days];
  }
  if (req.body.color) habit.color = req.body.color;
  if (req.body.checked !== undefined) {
    habit.checked = req.body.checked;
    if (req.body.checked) {
      habit.lastChecked = Date.now();
      await user.updateDailyStreak();
    }
  }

  await habit.save();

  const habitIndex = user.habits.findIndex((h) =>
    h._id.equals(req.params.habitId)
  );
  if (habitIndex !== -1) {
    user.habits[habitIndex] = habit;
  }

  await user.save();

  const habitsForToday = user.getHabitsForToday() || [];
  const checkedHabits = user.getCheckedHabits() || [];

  console.log(habitsForToday.length, checkedHabits.length);

  const stats = await user.getStats(req, next);
  if (stats.length > 0) {
    await stats[0].updateStat({
      habitsForTodayLength: habitsForToday.length,
      checkedHabitsForTodayLength: checkedHabits.length,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      habit,
    },
  });
});

exports.deleteHabit = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(new AppError("User not found.\n", 404));
  }

  const habit = await Habit.findById(req.params.habitId);

  if (!habit) {
    return next(new AppError("Habit not found.\n", 404));
  }

  user.habits = user.habits.filter((habitEl) => {
    return !habitEl._id.equals(req.params.habitId);
  });

  await user.save();

  await Habit.deleteOne({ _id: req.params.habitId });

  const habitsForToday = user.getHabitsForToday() || [];
  const checkedHabits = user.getCheckedHabits() || [];

  console.log(habitsForToday.length, checkedHabits.length);

  const stats = await user.getStats(req, next);
  if (stats.length > 0) {
    await stats[0].updateStat({
      habitsForTodayLength: habitsForToday.length,
      checkedHabitsForTodayLength: checkedHabits.length,
    });
  }

  res.status(204).json({
    status: "success",
  });
});

exports.getCurrentHabits = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  if (!userId) {
    return next(new AppError("User ID must be provided.\n", 400));
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User could not be found.\n", 404));
  }

  const habits = user.getHabitsForToday();

  if (!habits) {
    return next(new AppError("You don't have activities for today.\n", 404));
  }

  await user.resetCheckedHabits();

  res.status(200).json({
    status: "success",
    length: habits.length,
    data: {
      habits,
    },
  });
});
