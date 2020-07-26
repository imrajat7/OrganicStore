const express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
const path = require("path");
var favicon = require("serve-favicon");
var mongoose = require("mongoose");
var engine = require("ejs-mate");
var flash = require("express-flash");

var app = express();

var http = require("http");
var server = http.Server(app);
var PORT = process.env.PORT || 3000;

/* Session */
app.use(
    require("express-session")({
      secret: "abcUCAChitkara",
      saveUninitialized: true,
      resave: true,
    })
);

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(flash());

server.listen(PORT, () => {
    console.log("Sever on port: " + PORT);
});