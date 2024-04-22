const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/router");
const authRoutes = require("./routes/auth");
const protectedRoute = require("./routes/protectedRoute");
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/test";

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
const app = express();

db.on("connected", () => console.log("connected"));
db.on("open", () => console.log("open"));
db.on("disconnected", () => console.log("disconnected"));
db.on("reconnected", () => console.log("reconnected"));
db.on("disconnecting", () => console.log("disconnecting"));
db.on("close", () => console.log("close"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOption = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use("/", router);
app.use("/auth", authRoutes);
app.use("/protected", protectedRoute);

const port = 3001;
const server = app.listen(port, () => {
  console.log("server start");
});
