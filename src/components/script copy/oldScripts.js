var columnAmount = 4;
var dataAmountInColumn = 0;

if (dataAmount % columnAmount == 0) {
  dataAmountInColumn = dataAmount / columnAmount;
}

var containerMinHeight = comicsSelectorHeight / columnAmount;
var containerSetHeight = 0;
var comicsInColumn = 0;

comicsSelector.forEach((comic, index) => {
  if (containerMinHeight > containerSetHeight) {
    containerSetHeight = containerSetHeight + $(comic).height() + 16;
    comicsInColumn = index;
  }
});

$(".hero-comics-container").css("height", containerSetHeight);
/*
          var leftColumnHeight = containerSetHeight;
          var containerFullHeight = comicsSelectorHeight;
          var count = 1;

           comicsSelector.forEach((comic) => {
            if (leftColumnHeight > $(comic).height() && count < columnAmount) {
              leftColumnHeight = leftColumnHeight - $(comic).height();
            } else {
              containerFullHeight = containerFullHeight - containerMinHeight;
              leftColumnHeight = containerMinHeight;
              count++;
            }
            if (containerFullHeight < 0) {
              $(".hero-comics-container").css("height", containerSetHeight + $(comicsSelector[comicsInColumn]).height());
            }
          });*/
