$(document).ready(function() {

  const previewArray = $(".preview").children();
  const arrows = $(".arrows");
  let currentSlide = $(".slider-pic").attr("src");

  let currentImg = 0;
  let currentpic = previewArray[currentImg].src;

  arrows.on("click", function() {

    if ($(this).hasClass("arrows--left") === true) {
      subtractCurrent();
      currentpic = previewArray[currentImg].src;
    } else {
      addCurrent();
      currentpic = previewArray[currentImg].src;
    }
  });

  function subtractCurrent() {
    if (currentImg > 0) {
      currentImg--;
    } else {
      currentImg = previewArray.length - 1;
    }
    currentSlide = $(".slider-pic").attr("src", currentpic);
  }

  function addCurrent() {
    if (currentImg === previewArray.length - 1) {
      currentImg = 0;
      console.log(currentImg)
    } else {
      currentImg++;
      console.log(currentImg)
    }
    currentSlide = $(".slider-pic").attr("src", currentpic);
  }

});
