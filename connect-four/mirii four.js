/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
console.log(board);
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

 function makeBoard() {
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
   let boardArray = null;
    for (let y = 0; y < HEIGHT; y++){
      boardArray = [];
     } for (let x = 0; x < WIDTH; x++){
      boardArray.push(null);
    }
    board.push(boardArray);
   }
  

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board');

  // TODO: add comment for this code
  //create a table row element that acts section above the board
  let top = document.createElement("tr");
  //give that section an id of 'column top' so it can be manipulated and referenced later
  top.setAttribute("id", "column-top");
  //add and event listener for a click then pass in a handleClick callback function for what is suppose execute every time the top is clicked
  //(spoiler alert when you click it its supposed to handle dropping a piece down)
  top.addEventListener("click", handleClick);

  //do the following for the amount of times width is equal
  for (let x = 0; x < WIDTH; x++) {
    //create a data cell
    const headCell = document.createElement("td");
    //give it an id and a number equal to its iteration 
    headCell.setAttribute("id", x);
    // append the newly created row to the top header of the board
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //do this for the amount of times height is equal
  for (let y = 0; y < HEIGHT; y++) {
    //create a table row element in html
    const row = document.createElement("tr");
    //do this the amount of times width is equal
    for (let x = 0; x < WIDTH; x++) {
      //create a cell to go inside the row which is a table data html element
      const cell = document.createElement("td");
      //give it an id of height minus width
      cell.setAttribute("id", `${y}-${x}`);
      //append cell into the row
      row.append(cell);
    }
    //then append the freshly made row into the htmlboard
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece');
    if(currPlayer = 1){
      piece.classList.add('playerOne')
    } else {
      piece.classList.add('playerTwo')
    }
  //confused as to what this does
  piece.style.top = -50 * (y + 2);

  const placeTable = document.getElementById(`${y}-${x}`);
  placeTable.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
    alert(msg)
  }


/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);
  //? note sure what this means or what "in-memory" refers to in this case

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  } 


  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }


  // switch players
  // TODO: switch currPlayer 1 <-> 2 
  if(currPlayer === currPlayer) {
    currPlayer = 2
  } else {
    currPlayer = 1
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // nested loops to iterate over rows and columns to get individual cells to check them
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // creates an array of horizontal cells by adding one to x (the width each time)
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // creates an array of vertical cells by adding one to y (the height each time)
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // creates an array of diagonal cells moving right by adding a cell up and a cell over each time ( )
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // creates an array of diagonal cells moving left by adding a cell down and a cell over each time ( )
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      // uses out check for win function to check the horizontal, vertical, Diagonal Right and Diagonal Left variables for where the win occurs
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
