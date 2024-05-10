const express = require("express");
const morgan = require("morgan");
const coffeeRouter = require("./routes/coffeeRoutes");
const AppError = require("./utils/appError");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*", // Allow requests from any origin (for development)
    methods: "GET,POST, DELETE, PUT", // Allow only specified HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allow only specified headers
  }),
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ROUTES
app.use("/api/v1/coffee", coffeeRouter);

// 404 NOT FOUND
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// GLOBAL ERROR HANDLING (must be implemented)
module.exports = app;
