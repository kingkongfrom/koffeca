const Coffee = require("../models/coffeeModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllCoffee = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Coffee.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const coffee = await features.query;

  if (coffee.length === 0) {
    return next(new AppError("No coffee products found", 404));
  }

  res.status(200).json({
    status: "success",
    result: coffee.length,
    data: {
      coffee,
    },
  });
});

exports.createCoffee = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newCoffee = await Coffee.create(req.body);
  console.log(newCoffee);

  res.status(201).json({
    status: "success",
    data: {
      coffee: newCoffee,
    },
  });
});
