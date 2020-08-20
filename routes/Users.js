const express = require("express");
var bodyParser = require("body-parser");
const app = express.Router();
var passport = require("passport");
var moment = require("moment");

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// parse application/json
app.use(bodyParser.json());

/* Models */
var Users = require("../models/Users");

// Middleware
var middleware = require("../middleware/middleware");

// // Controllers
// var controllers = require("../controllers");

/* POST Check Login */
app.post(
    "/checkLogin",
    passport.authenticate("local", {
      successRedirect: "/home",
      failureRedirect: "/",
      failureFlash: true,
    })
  );

module.exports = app;