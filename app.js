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

// app.use(express.json());
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

const keys = process.env.API_KEY;

//define weather route
app.get("/weather", function(req, res, next) {

  try {
    throw new Error("Hello error!")
  } catch (error) {
    next(error)
  }

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
      res.render("weather", {
        solKeys: solKeys,
        highTemp: highTemp,
        lowTemp: lowTemp,
        pressure: pressure,
        season: season,
        wind: wind
      });
    });
  });
});


app.get("/pictures", function(req, res) {

  // let latestSol = "";
  // let latestDate = "";
  //
  // const urlDate = `https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity/?api_key=${keys}`
  // const urlPic = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${latestDate}&api_key=${keys}`

  // https.get(urlDate, function(response) {
  //
  //   //run when getting the data
  //   response.on("data", function(data) {
  //     let resultDate = "";
  //     //add result one by one to empty variable
  //     resultDate += data;
  //     const parsedDate = JSON.parse(resultDate);
  //     latestSol = resultDate["photo_manifest"]["max_sol"];
  //     latestDate = resultDate["photo_manifest"]["max_date"];
  //
  //   });
  // });

  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=${keys}`

  https.get(url, function(response) {
    let result = "";
    //run when getting the data
    response.on("data", function(data) {

    //add result one by one to empty variable-string
      result += data;
    });

    response.on("end", function() {
      //parse data
      const parsed = JSON.parse(result);
      // get img_src from the data
      const images = parsed.photos.map(img => img.img_src);

      res.render("pictures", {
        images: images
      });
    });
  });
});


//listen to port 3000;
app.listen(port, function() {
  console.log("server started");
});
