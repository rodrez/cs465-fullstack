// GET meal view
var fs = require("fs");

var meals = JSON.parse(fs.readFileSync("./data/meals.json", "utf8"));

/* GET meal page. */
const meal = (req, res) => {
  res.render("meals", { title: "Travel Getaways", meals });
};

module.exports = {
  meal,
};
