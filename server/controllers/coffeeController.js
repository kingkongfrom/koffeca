const Coffee = require("../models/coffeeModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllCoffee = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Coffee.find(), req.query).filter().sort().limitFields().paginate();

    const coffee = await features.query;

    if (!coffee) {
        return next(new AppError("No coffee products found"));
    }
    
    res.status(200).json({
        status: "success",
        result: coffee.length,
        data: {
            coffee
        }
    });
});

