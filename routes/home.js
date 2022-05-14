const express = require("express");
const router = express.Router();

//define root route
router.get("/", function(req, res) {
  //render home
  res.render("index");
});

module.exports = router;
