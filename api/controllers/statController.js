const moment = require("moment");
const Stat = require("./../models/statModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.createStat = catchAsync(async (req, res, next) => {
  const user = req.user;
  let newStat = {};

  const habitsForToday = user.getHabitsForToday() || [];
  const checkedHabits = user.getCheckedHabits() || [];

  const today = moment().startOf("day");
  const lastStatCreated = user.statCreatedAt
    ? moment(user.statCreatedAt).startOf("day")
    : null;

  if (!lastStatCreated) {
    user.statCreatedAt = Date.now();
    await user.save();

    newStat = await Stat.create({
      user: user._id,
      statDate: Date.now(),
      pendingHabits: habitsForToday.length - checkedHabits.length,
      completedHabits: checkedHabits.length,
      totalHabits: habitsForToday.length,
    });
  } else {
    const dayDiff = today.diff(lastStatCreated, "days");

    if (dayDiff >= 1) {
      user.statCreatedAt = Date.now();
      await user.save();

      newStat = await Stat.create({
        user: user._id,
        statDate: Date.now(),
        pendingHabits: habitsForToday.length - checkedHabits.length,
        completedHabits: checkedHabits.length,
        totalHabits: habitsForToday.length,
      });
    } else {
      return next(new AppError("Stat already created for today", 403));
    }
  }

  res.status(201).json({
    status: "success",
    data: {
      newStat,
    },
  });
});

exports.getStatsForAUser = catchAsync(async (req, res, next) => {
  const stats = await req.user.getStats(req, next);

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});
