const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/router");
const authRoutes = require("./routes/auth");
const protectedRoute = require("./routes/protectedRoute");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("./db/connection");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOption = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));

app.use(
  session({
    genid: (req) => {
      return uuidv4(); // Generate a unique session ID
    },
    secret: process.env.EXPRESS_SESSION_SECRET, // Your session secret
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Session duration (in milliseconds)
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      dbName: process.env.MONGO_DB_NAME,
      collectionName: "sessions", // Name of the collection to store sessions
      stringify: false,
      autoRemove: "interval",
      autoRemoveInterval: 1, // Interval for session cleanup
    }),
  })
);

app.use("/", router);
app.use("/auth", authRoutes);
app.use("/protected", protectedRoute);

const port = 3001;

app.listen(port, () => {
  console.log("server start");
});
