const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getCurrentUserProfile = catchAsync(async (req, res, next) => {
  const currentUser = req.user;

  res.status(200).json({
    status: "success",
    data: {
      user: currentUser,
    },
  });
});
