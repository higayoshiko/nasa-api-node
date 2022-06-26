const express = require("express");
const http = require("http");
const router = express.Router();

let clickedPage = 0;
const keys = process.env.API_KEY;

//get the name of the clicked page/num and redirect if no err
router.post("/", function(req, res) {
  clickedPage = Object.keys(req.body);
  try {
    res.redirect("pictures");
  }catch(err){
    console.log(err);
  }
});

router.get("/", function(req, res) {

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

  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${clickedPage}&api_key=${keys}`

  http.get(url, function(response) {
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
      //send array of pictures
      res.render("pictures", {
        images: images
      });
    });
  });
});

module.exports = router;
