const request = require("request");
const apiOptions = {
  server: "http://localhost:3000",
};

// // GET travel view
// var fs = require("fs");
//
// var trips = JSON.parse(fs.readFileSync("./data/trips.json", "utf8"));
//

const renderTravelList = (req, res, responseBody) => {
  let message = null;
  let pageTitle = process.env.npm_package_name + " - Travel";
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No trips found";
    }
  }

  res.render("travel", {
    title: pageTitle,
    trips: responseBody,
    message: message,
  });
};

const travelList = (req, res) => {
  const path = "/api/trips";
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: "GET",
    json: {},
  };

  console.log(
    ">> travelController.travelList calling API server at: ",
    requestOptions.url,
  );
  request(requestOptions, (err, { statusCode }, body) => {
    if (err) {
      console.log(">> travelController.travelList error: ", err);
    }
    renderTravelList(req, res, body);
  });
};

/* GET travel page. */
const travel = (req, res) => {
  res.render("travel", { title: "Travel Getaways", trips });
};

module.exports = {
  travel,
  travelList,
};
