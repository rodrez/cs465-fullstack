const express = require("express");
const router = express.Router();
const roomsController = require("../controllers/rooms");

/* GET travel page. */
router.get("/", roomsController.room);

module.exports = router;
