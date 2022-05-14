$(document).ready(function() {

  const pageList = $(".pages");
  let currentPage = "";

  //add click event to all the oages
  pageList.on("click", function() {
    //get the name attribute of this
    const pageName = $(this).attr("name");
    //set and store the name in the local storage and call it clickedPage
    localStorage.setItem("clickedPage", pageName);
  });

  //while loading the pagr
  window.onload = function() {
    //check if there is a stored name
    if (localStorage.length !== 0) {
    //if there is, get the stored name and assign it to the existing variable
      currentPage = localStorage.getItem("clickedPage");
    //if there isnt, assign the number/name 1;
    } else {
      currentPage = "1";
    }
    //add active style to that specific page num
    $(`.pages__ctn>.pages[name="${currentPage}"]`).addClass("pages--active");
    //clear the storage after loading
    localStorage.clear();
  }

  const previewArray = $(".preview").children();
  let currentIndex = 0;
  let currentSlide = $(".slider-pic").attr("src");
  let currentSrc = previewArray[currentIndex].src;
  let currentPreview = $(".preview>img")[currentIndex];

  //initial run. find the first img and add border to it
  $(".preview").find(currentPreview).addClass("previews--active");
  //assign the src & show the first img to the slide
  currentSlide = $(".slider-pic").attr("src", currentSrc);


  const arrows = $(".arrows");
  //add click event to both arrows
  arrows.on("click", function() {
    //determine if this has the arrows--left class
    if ($(this).hasClass("arrows--left") === true) {
      //run the function to decrement current index num
      subtractCurrent();
      //if it doesnt, increment the index num
    } else {
      addCurrent();
    }
  });


  function subtractCurrent() {
    //run the function to remove the border to the current preview
    removeBorder();
    //if the index is more than 0, decrement
    if (currentIndex > 0) {
      currentIndex--;
    //if it is less than 0, change to the last index of the array
    } else {
      currentIndex = previewArray.length - 1;
    }
    //change the src based on the current index of previews
    currentSrc = previewArray[currentIndex].src;
    //assign & show the current src to the slider
    currentSlide = $(".slider-pic").attr("src", currentSrc);
    //run function to add border to the new preview
    addBorder();
  }

  function addCurrent() {
    //run the function to remove the border to the current preview
    removeBorder();
    //if it is the last index, change to the first index
    if (currentIndex === previewArray.length - 1) {
      currentIndex = 0;
    //if it is not, increment
    } else {
      currentIndex++;
    }
    //change the src based on the current index of previews
    currentSrc = previewArray[currentIndex].src;
    //assign & show the current src to the slider
    currentSlide = $(".slider-pic").attr("src", currentSrc);
    //run function to add border to the new preview
    addBorder();
  }

  function removeBorder() {
    //get the current preview by index
    currentPreview = $(".preview>img")[currentIndex];
    //remove border
    $(".preview").find(currentPreview).removeClass("previews--active");
  }

  function addBorder() {
    //get the new preview by index
    currentPreview = $(".preview>img")[currentIndex];
    //add border
    $(".preview").find(currentPreview).addClass("previews--active");
  }

});
