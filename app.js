const express = require("express");
var session = require("express-session");
var mongoStore = require("connect-mongo")(session);
var bodyParser = require("body-parser");
const path = require("path");
var favicon = require("serve-favicon");
var mongoose = require("mongoose");
var engine = require("ejs-mate");
var morgan = require("morgan");
var flash = require("express-flash");
const passport = require("passport");

/* ENV */
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

var app = express();

/* Passport Config */
require("./config/passport")(passport);

var http = require("http");
var server = http.Server(app);
var PORT = process.env.PORT || 3000;

/* DB */
require("./config/db");

app.use(morgan("dev"));

/* Session */
app.use(
  require("express-session")({
    secret: "abcUCAChitkara",
    saveUninitialized: true,
    resave: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(favicon(path.join(__dirname, "public//img/", "logo.ico")));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(flash());

/* Middleware */
var middleware = require("./middleware/middleware");

app.get("/", function (req, res) {
  var err_msg = req.flash("errors")[0]
  if (req.isAuthenticated()) {
    req.logout();
  }
  res.render("login", {
    title: "Login",
    errors: err_msg == undefined ? [] : err_msg,
    success: req.flash("success")
  });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error", {
    title: "Page404",
    header: false
  });
});

server.listen(PORT, () => {
  console.log("Sever on port: " + PORT);
});