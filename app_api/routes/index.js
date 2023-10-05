var express = require("express");
var router = express.Router();

const tripsController = require("../controllers/trips");

/* GET home page. */
router.get("/trips", tripsController.index);

module.exports = router;
