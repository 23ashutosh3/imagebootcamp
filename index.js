const express = require("express");
const app = express();
const port = 8000;

const db = require("./config/mongoose");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("./config/passport_jwt_strategy");
const path = require("path");

app.use(passport.initialize());
app.use(express.urlencoded());

mongoose.Promise = global.Promise;

// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error:err`);
  } else {
    console.log(`server is running:${port}`);
  }
});
