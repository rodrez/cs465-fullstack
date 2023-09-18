// GET travel view
var fs = require("fs");

var trips = JSON.parse(fs.readFileSync("./data/trips.json", "utf8"));

/* GET travel page. */
const travel = (req, res) => {
  res.render("travel", { title: "Travel Getaways", trips });
};

module.exports = {
  travel,
};
