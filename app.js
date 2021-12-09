const express = require("express");
var bodyParser = require("body-parser");
var app = express();

//set the view engine to ejs
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("weather", {hello: hello});
});


app.listen(3000, function() {
  console.log("server started");
});
