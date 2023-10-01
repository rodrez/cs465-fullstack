// .seedgooserc.js
module.exports = {
  modelBaseDirectory: "app_server/models", // model directory name
  models: "**/*.js", // model matcher
  data: "data", // data directory name
  db: "mongodb://localhost:27017/url-to-db", // db connection url
};
