const mongoose = require("mongoose");
const TripsModel = mongoose.model("trips");
const User = mongoose.model("User");

const getUser = (req, res, callback) => {
  if (req.auth && req.auth.email) {
    console.log("req.auth.email: ", req.auth.email);
    const email = req.auth.email;
    User.findOne({ email: email }).exec((err, user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else if (err) {
        console.log(err);
        return res.status(404).json(err);
      }
      callback(req, res, user.name);
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};

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

const tripsAddTrip = async (req, res) => {
  getUser(req, res, (req, res) => {
    TripsModel.create(
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      },
      (err, trip) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(201).json(trip);
        }
      },
    );
  });
};

const tripsDeleteTrip = async (req, res) => {
  if (!req.params.code) {
    return res.status(404).json({ message: "Not found, tripId is required" });
  }

  getUser(req, res, (req, res) => {
    TripsModel.findOneAndRemove({ code: req.params.code })
      .then((trip) => {
        if (!trip) {
          return res
            .status(404)
            .send({ message: "trip not found with id " + req.params.code });
        }
        res.send({ message: "trip deleted successfully!" });
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res
            .status(404)
            .send({ message: "trip not found with id " + req.params.code });
        }
        return res.status(500).send({
          message: "Could not delete trip with id " + req.params.code,
        });
      });
  });
};

const tripsUpdateTrip = async (req, res) => {
  if (!req.params.code) {
    return res.status(404).json({ message: "Not found, tripId is required" });
  }
  getUser(req, res, (req, res) => {
    TripsModel.findOneAndUpdate(
      { code: req.params.code },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      },
      { new: true },
    )
      .then((trip) => {
        if (!trip) {
          return res
            .status(404)
            .send({ message: "trip not found with id " + req.params.code });
        }
        res.send(trip);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res
            .status(404)
            .send({ message: "trip not found with id " + req.params.code });
        }
        return res
          .status(500)
          .send({ message: "Error updating trip with id " + req.params.code });
      });
  });
};

module.exports = {
  tripsList,
  tripsByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip,
  getUser,
};
