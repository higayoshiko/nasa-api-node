const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const port = 3000;
//require DontEnv for environment variables from .env file
require("dotenv").config();

//set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/img", express.static(__dirname + "public/img"));

//define root route
app.get("/", function(req, res) {
  //render and send
  res.render("index");
});

//define weather route
app.get("/weather", function(req, res) {
  //use hidden api key
  const keys = process.env.API_KEY;
  const url = `https://api.nasa.gov/insight_weather/?api_key=${keys}`;

  https.get(url, function(response) {
    let result = "";
      //run when getting the data
    response.on("data", function(data) {
      //add result one by one to empty variable
      result += data;
    });

    //run at end of response
    response.on("end", function() {
      //parse result to JSON
      const parsed = JSON.parse(result);

      //get current SOL
      const solKeys = parsed.sol_keys[0];
      //get high & low temp and round them off
      const highTemp = Math.round(parsed[solKeys]["AT"]["mx"]);
      const lowTemp = Math.round(parsed[solKeys]["AT"]["mn"]);
      //get average pressure and round it off
      const pressure = Math.round(parsed[solKeys]["PRE"]["av"]);
      //get current season
      const season = parsed[solKeys]["Season"];
      //get average wind speed
      const wind = Math.round(parsed[solKeys]["HWS"]["av"]);
        //render and send
        res.render("weather",
          {solKeys: solKeys, highTemp: highTemp,
          lowTemp: lowTemp, pressure: pressure,
          season: season, wind: wind});
    });
  });
});

//listen to port 3000;
app.listen(port, function() {
  console.log("server started");
});
