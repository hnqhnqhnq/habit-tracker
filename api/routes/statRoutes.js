const express = require("express");
const Stat = require("./../models/statModel");
const authController = require("./../controllers/authController");
const statController = require("./../controllers/statController");

const router = express.Router();

router
  .route("/")
  .post(authController.protect, statController.createStat)
  .get(authController.protect, statController.getStatsForAUser);

module.exports = router;
