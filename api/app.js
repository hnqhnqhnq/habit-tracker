const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");

// Create express app
const app = express();

// CORS settings
const corsOptions = {
  origin: [
    "http://192.168.100.4:8081",
    "http://192.168.100.67:8081",
    "http://localhost:8081",
  ],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

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
app.use(`${process.env.API_ROUTE}`, limiter);

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
app.all("*", (req, res, next) => {
  next(new AppError(`The endpoint ${req.originalUrl} does not exist!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
