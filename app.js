const express = require("express");
const app = express();
const path = require('node:path');
const ejs = require("ejs");
const bodyParser = require("body-parser");
const port = 3000;
//require DontEnv for environment variables from .env file
require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
//set the view engine to ejs
app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/img", express.static(__dirname + "public/img"));

const picRoute = require("./routes/pictures");
app.use("/pictures", picRoute);
const weatherRoute = require("./routes/weather");
app.use("/weather", weatherRoute);
const homeRoute = require("./routes/home");
app.use("/", homeRoute);

//listen to port 3000;
app.listen(port, function() {
  console.log("server started");
});
