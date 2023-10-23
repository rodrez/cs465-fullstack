const express = require("express");
const router = express.Router();
const mealsController = require("../controllers/meals");

/* GET travel page. */
router.get("/", mealsController.meal);

module.exports = router;
