const express = require("express");
const router = express.Router();
const { expressjwt: jwt } = require("express-jwt");
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload",
  algorithms: ["HS256"],
});

console.log("auth: ", auth);

const authController = require("../controllers/authentication");
const tripsController = require("../controllers/trips");

/* Authentication */
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

/* GET home page. */
router
  .route("/trips")
  .get(tripsController.tripsList)
  .post(auth, tripsController.tripsAddTrip);
router
  .route("/trips/:code")
  .get(tripsController.tripsByCode)
  .put(auth, tripsController.tripsUpdateTrip)
  .delete(auth, tripsController.tripsDeleteTrip);

module.exports = router;
