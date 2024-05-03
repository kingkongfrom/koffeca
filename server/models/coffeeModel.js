const mongoose = require("mongoose");

const coffeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    producer: {
        type: String,
        required: [true, "Producer is required."]
    },
    variety: {
        type: String,
        required: [true, "Variety is required."]
    },
    roast: {
        type: String,
        enum: ["CLARO", "MEDIO", "OSCURO"],
        required: [true, "Roast level is required. Please select from CLARO, MEDIO, or OSCURO."]
    },
    weight_options: [{
        weight: {
            type: Number,
            required: true,
            enum: [200, 380, 500, 1000]
        },
        price: {
            type: Number,
            required: true
        }
    }],
    grinding: {
        type: String,
        enum: ["MOLIDO", "GRANO ENTERO"],
        required: [true, "Grinding type is required. Please select from MOLIDO or GRANO ENTERO."]
    },
    region: {
        type: String,
        enum: ["VALLE CENTRAL", "TRES RIOS", "TURRIALBA", "BRUNCA", "GUANACASTE", "TARRAZU", "OROSI", "VALLE ORIENTAL"],
        required: [true, "Region is required. Please select from available options."]
    },
    process: {
        type: String,
        enum: ["LAVADO", "NATURAL", "HONEY"],
        required: [true, "Processing method is required. Please select from LAVADO, NATURAL, or HONEY."]
    },
    description: {
        type: String,
        required: [true, "Description is required."]
    },
    taste: {
        type: String,
        required: [true, "Taste is required."]
    },
    discount: {
        type: Number
    },
    discount_start_date: {
        type: Date
    },
    discount_end_date: {
        type: Date
    },
    SKU: {
        type: String,
        required: [true, "SKU is required."]
    },
    image1: {
        type: String,
        required: [true, "Image one is required."]
    },
    image2: {
        type: String,
        required: [true, "Image two is required."]
    }
});

const CoffeeModel = mongoose.model("CoffeeModel", coffeeSchema, "coffee");
module.exports = CoffeeModel;
