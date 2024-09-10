const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");

// Create express app
const app = express();

// Helmet
app.use(helmet());

// Cookie Parser
app.use(cookieParser());

// Logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limiter
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this ip, please try again in an hour!",
});
app.use("/api", limiter);

// Body Parser in req.body with 10kb limit
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Parameter pollution
//app.use(hpp({}))

// Routes
app.use(`${process.env.API_ROUTE}/users`, userRouter);

module.exports = app;
