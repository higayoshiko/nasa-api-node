const express = require("express");
const router = express.Router();

const keys = process.env.API_KEY;

//define weather route
router.get("/", function(req, res, next) {

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

module.exports = router;
