// GET meal view
var fs = require("fs");

var rooms = JSON.parse(fs.readFileSync("./data/rooms.json", "utf8"));

/* GET meal page. */
const room = (req, res) => {
  res.render("rooms", { title: "Travel Getaways", rooms });
};

module.exports = {
  room,
};
