$(document).ready(function() {

  const previewArray = $(".preview").children();
  const arrows = $(".arrows");
  let currentSlide = $(".slider-pic").attr("src");
  let currentImg = 0;
  let currentpic = previewArray[currentImg].src;
  let currentPreview = $(".preview>img")[currentImg];

  const pageList = $(".pages");
  let currentPage = 0;

  //initial run. load the first pic of the page and add border to preview
  $(".preview").find(currentPreview).addClass("previews--active");
  currentSlide = $(".slider-pic").attr("src", currentpic)

  //add click event
  arrows.on("click", function() {
    //if it has this class
    if ($(this).hasClass("arrows--left") === true) {
      subtractCurrent();
      currentpic = previewArray[currentImg].src;
    //if it doesnt
    } else {
      addCurrent();
      currentpic = previewArray[currentImg].src;
    }
  });

  function subtractCurrent() {
    removeBorder();
    if (currentImg > 0) {
      currentImg--;
    } else {
      currentImg = previewArray.length - 1;
    }
    currentSlide = $(".slider-pic").attr("src", currentpic);
    addBorder();
  }

  function addCurrent() {
    removeBorder();
    if (currentImg === previewArray.length - 1) {
      currentImg = 0;
      console.log(currentImg)
    } else {
      currentImg++;
      console.log(currentImg)
    }
    currentSlide = $(".slider-pic").attr("src", currentpic);
    addBorder();
  }

  function removeBorder() {
    currentPreview = $(".preview>img")[currentImg];
    $(".preview").find(currentPreview).removeClass("previews--active");
  }

  function addBorder() {
    currentPreview = $(".preview>img")[currentImg];
    $(".preview").find(currentPreview).addClass("previews--active");
  }

  pageList.on("click", function() {

    if($(this).hasClass("pages--active"))

  });

});
