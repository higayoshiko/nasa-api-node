const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

//set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/img", express.static(__dirname + "public/img"));

app.get("/", function(req, res) {
  res.render("index");
});


app.get("/weather", function(req, res) {

  const url = "https://api.nasa.gov/insight_weather/?api_key=PULvfd8KgJN1IErBCYzGEPqDScihqeRxZS8Zvy0V&feedtype=json&ver=1.0";

  https.get(url, function(response) {
    let result = "";
    response.on("data", function(data) {
      result += data;
    });
    response.on("end", function() {
      const parsed = JSON.parse(result);
      const solKeys = parsed.sol_keys.join("");
      const highTemp = parsed[solKeys]["AT"]["mx"];
      const lowTemp = parsed[solKeys]["AT"]["mn"];

        res.render("weather", {hello: highTemp});
    });
  });


});


app.listen(3000, function() {
  console.log("server started");
});
