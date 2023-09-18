// Get Homepage

const index = (req, res) => {
  console.log("index");
  res.render("index", { title: "Travlr Getaways" });
};

module.exports = {
  index,
};
