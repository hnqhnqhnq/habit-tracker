const User = require("./../models/userModel");

exports.getCurrentUserProfile = async (req, res) => {
  try {
    const currentUser = req.user;

    res.status(200).json({
      status: "success",
      data: {
        user: currentUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};
