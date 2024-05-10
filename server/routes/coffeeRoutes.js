const express = require("express");
const coffeeController = require("../controllers/coffeeController");

const router = express.Router();

router
  .route("/")
  .get(coffeeController.getAllCoffee)
  .post(coffeeController.createCoffee);

router.route("/:id").delete(coffeeController.deleteCoffee);

module.exports = router;
