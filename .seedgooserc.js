// .seedgooserc.js
module.exports = {
  modelBaseDirectory: "app_server/database/models", // model directory name
  models: ["*.js", "!db.js"], // model matcher
  data: "./data/", // data directory name
  db: `mongodb://root:root@localhost/travlr?authSource=admin`,
};
