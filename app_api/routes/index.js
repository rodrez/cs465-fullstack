var express = require("express");
var router = express.Router();

const tripsController = require("../controllers/trips");

/* GET home page. */
router
  .get("/trips", tripsController.tripsList)
  .post(tripsController.tripsAddTrip);
router.get("/trips/:code", tripsController.tripsByCode);

module.exports = router;
