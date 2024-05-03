const express = require("express");
const morgan = require("morgan");
const coffeeRouter = require("./routes/coffeeRoutes");
const AppError = require("./utils/appError");
const cors = require("cors");

const app = express();


app.use(cors({
    origin: [""],
    methods: ["POST", "GET"],
    credentials: true
}));

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