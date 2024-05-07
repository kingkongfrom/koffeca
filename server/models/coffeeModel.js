const mongoose = require("mongoose");

const coffeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: [true, "Producer is required."],
  },
  variety: {
    type: String,
    required: [true, "Variety is required."],
  },
  roast: {
    type: String,
    enum: ["CLARO", "MEDIO", "OSCURO"],
    required: [
      true,
      "Roast level is required. Please select from CLARO, MEDIO, or OSCURO.",
    ],
  },
  weight: {
    type: String,
    enum: [],
    required: [
      true,
      "Weight type is required. Please select from 200g, 340g, 500g, 1000g.",
    ],
  },
  price: {
    type: Number,
    required: [true, "A coffee must have a price"],
  },
  grinding: {
    type: String,
    enum: ["MOLIDO", "GRANO ENTERO"],
    required: [
      true,
      "Grinding type is required. Please select from MOLIDO or GRANO ENTERO.",
    ],
  },
  region: {
    type: String,
    enum: [
      "VALLE CENTRAL",
      "TRES RIOS",
      "TURRIALBA",
      "BRUNCA",
      "GUANACASTE",
      "TARRAZU",
      "OROSI",
      "VALLE ORIENTAL",
    ],
    required: [
      true,
      "Region is required. Please select from available options.",
    ],
  },
  process: {
    type: String,
    enum: ["LAVADO", "NATURAL", "HONEY", "RED HONEY"],
    required: [
      true,
      "Processing method is required. Please select from LAVADO, NATURAL, or HONEY.",
    ],
  },
  description: {
    type: String,
    required: [true, "Description is required."],
  },
  taste: {
    type: String,
    required: [true, "Taste is required."],
  },
  discount: {
    type: Number,
  },
  discount_start_date: {
    type: Date,
  },
  discount_end_date: {
    type: Date,
  },
  quantity: {
    type: Number,
    required: [true, "quantity is required."],
  },
  available: {
    type: Boolean,
  },
  sku: {
    type: String,
    required: [true, "SKU is required."],
  },
  images: {
    type: [String], // Array of strings
    required: [true, "At least one image is required."], // Ensure at least one image is required
  },
});

coffeeSchema.pre("save", function (next) {
  this.available = this.quantity > 0;
  next();
});

const CoffeeModel = mongoose.model("CoffeeModel", coffeeSchema, "coffee");
module.exports = CoffeeModel;
