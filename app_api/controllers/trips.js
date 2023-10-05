const mongoose = require("mongoose");
const TripsModel = mongoose.model("trips");

// GET all trips: /trips
const tripsList = async (req, res) => {
  TripsModel.find({}).exec((err, trips) => {
    if (!trips) {
      return res.status(404).json({ message: "trips not found" });
    } else if (err) {
      return res.status(404).json(err);
    } else {
      return res.status(200).json(trips);
    }
  });
};

const tripsByCode = async (req, res) => {
  console.log("CODE: ", req.params.code);
  TripsModel.find({ code: req.params.code }).exec((err, trip) => {
    if (!trip) {
      return res.status(404).json({ message: "trip not found" });
    } else if (err) {
      return res.status(404).json(err);
    } else {
      return res.status(200).json(trip);
    }
  });
};

module.exports = {
  tripsList,
  tripsByCode,
};
