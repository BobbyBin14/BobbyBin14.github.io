var rows = 3;
var columns = 4;

var currTile;
var otherTile;

var turns = 0;
window.onload = function () {
  // initialize the 4x3 board
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      //<assets>
      let tile = document.createElement("img");
      tile.src = "./assets/blank.png";
      // DRAG FUNCTIONALITY
      tile.addEventListener("dragstart", dragStart); // click on image to drag
      tile.addEventListener("dragover", dragOver); // drag an image
      tile.addEventListener("dragenter", dragEnter); // dragging an image into another one
      tile.addEventListener("dragleave", dragLeave); // dragging an image away from another one
      tile.addEventListener("drop", dragDrop); // drop an image onto another one
      tile.addEventListener("dragend", dragEnd); // after you completed dragDrop

      document.getElementById("board").append(tile);
    }
    // Event listener for the "info-button"
    document
      .getElementById("info-button")
      .addEventListener("click", function () {
        document.getElementById("info-modal").style.display = "block";
      });

    // Event listener for the close button of the modal
    document
      .getElementsByClassName("close")[0]
      .addEventListener("click", function () {
        document.getElementById("info-modal").style.display = "none";
      });
  }

  // pieces
  let pieces = [];
  for (let i = 1; i <= rows * columns; i++) {
    pieces.push(i.toString()); // put "1" to "12" into the array (puzzle images names)
  }
  pieces.reverse();
  for (let i = 0; i < pieces.length; i++) {
    let j = Math.floor(Math.random() * pieces.length);

    // swap
    let tmp = pieces[i];
    pieces[i] = pieces[j];
    pieces[j] = tmp;
  }

  for (let i = 0; i < pieces.length; i++) {
    let tile = document.createElement("img");
    tile.src = "./assets/" + pieces[i] + ".png";
    document.getElementById("pieces").append(tile)

    tile.id = "tile" + i

    randomPosition (tile)

    // DRAG FUNCTIONALITY
    tile.addEventListener("dragstart", dragStart); // click on image to drag
    tile.addEventListener("dragover", dragOver); // drag an image
    tile.addEventListener("dragenter", dragEnter); // dragging an image into another one
    tile.addEventListener("dragleave", dragLeave); // dragging an image away from another one
    tile.addEventListener("drop", dragDrop); // drop an image onto another one
    tile.addEventListener("dragend", dragEnd); // after you completed dragDrop

    document.getElementById("pieces").append(tile);
  }
};

// DRAG TILES
function dragStart() {
  currTile = this; // this refers to image that was clicked on for dragging
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this; // this refers to image that is being dropped on
}

function dragEnd() {
  if (currTile.src.includes("blank")) {
    return;
  }
  let currImg = currTile.src;
  let otherImg = otherTile.src;
  currTile.src = otherImg;
  otherTile.src = currImg;

  turns += 1;
  document.getElementById("turns").innerText = turns;

  if (checkWinningCondition()) {
    showPopup();
  }
}
function checkWinningCondition() {
  let boardImages = document.querySelectorAll("#board img");
  let correctOrder = Array.from({ length: rows * columns }, (_, i) =>
    (i + 1).toString()
  );

  let currentOrder = Array.from(
    boardImages,
    (img) => img.src.split("/").pop().split(".")[0]
  );

  return JSON.stringify(currentOrder) === JSON.stringify(correctOrder);
}

function showPopup() {
  document.getElementById("win-popup").style.display = "block";
  document
    .getElementsByClassName("close-popup")[0]
    .addEventListener("click", function () {
      document.getElementById("win-popup").style.display = "none";
    });
}

// move given element to random position
function randomPosition(el){
  // find the board
  let board = document.getElementById("board");

  el.style.position = 'absolute';
  if(Math.random() > 0.5){
    // generate on left
    // work out left border of board
    let randomleft = getRandomFloatRange(0, board.getBoundingClientRect().left - 150) + "px"
    el.style.left = randomleft
    el.style.top = getRandomFloatRange(0, window.innerHeight - 150) + "px"
    console.log(board.getBoundingClientRect().left, randomleft, 150) 
  } else {
   // generate on right
  // work out right border of board
  el.style.left = getRandomFloatRange(board.getBoundingClientRect().right, window.innerWidth - 150) + "px"
  el.style.top = getRandomFloatRange(0, window.innerHeight - 150) + "px"
  }

  // random float
function getRandomFloatRange(min, max){
  return Math.random() * (max - min) + min;
}
  }
