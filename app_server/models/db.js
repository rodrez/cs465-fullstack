const { on } = require("events");
const mongoose = require("mongoose");
const host = process.env.DB_HOST || "localhost";
const dbURI = `mongodb://${host}/travlr`;
const readLine = require("readline");

mongoose.set("useUnifiedTopology", true);

const connect = () => {
  setTimeout(
    () =>
      mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true }),
    1000,
  );
};

// TODO: Needs completion
mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on("error", () => {
  console.log(`Mongoose connection error: ${err}`);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

const readLine = require("readline");
if (process.platform === "win32") {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on("SIGINT", () => {
    process.emit("SIGINT");
  });
}

const gracefulShutdown = () => {
  mongoose.connection.close(() => {
    console.log("Mongoose disconnected through app termination");
    process.exit(0);
  });
};

mongoose.connection.on("SIGUSR2", () => {
  gracefulShutdown("nodemon restart", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});

mongoose.connection.on("SIGUSR2", () => {});
mongoose.connection.on("SIGTERM", () => {});

connect();

// bring in the schemas
require("./travlr");
