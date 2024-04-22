const mongoose = require("mongoose");
require("dotenv").config();

const mongoDB = `mongodb://localhost:27017/${process.env.MONGO_DB_NAME}`;

mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;

mongoose.connection
  .on("open", () => console.log("The goose is open"))
  .on("close", () => console.log("The goose is closed"))
  .on("error", (error) => {
    console.log(error);
    process.exit();
  });

module.exports = mongoose;
