const express = require("express");
const coffeeController = require("../controllers/coffeeController");

const router = express.Router();

router.route("/").get(coffeeController.getAllCoffee);

module.exports = router;