// player factory
const player = (name, marker) => {
  const setName = (aName) => {
    name = aName;
  };

  return () => {
    name, marker, setName;
  };
};

// gameboard module
const gameboard = (() => {
  let board = new Array(9);
  let currentMarker = "X";
  let turn = 1;
  let gameWon = "";

  const addMarker = (index) => {
    if (board[index] == null && !isGameOver()) {
      board[index] = currentMarker;
      checkMove();
      return true;
    }
    return false;
  };

  const clear = () => {
    board.splice(0, board.length);
    currentMarker = "X";
    turn = 1;
    gameWon = "";
  };

  const toggleMarker = () => {
    if (currentMarker == "X") {
      currentMarker = "O";
    } else {
      currentMarker = "X";
      turn++;
    }
  };

  const checkMove = () => {
    // check for tie
    if (turn == 5) {
      tieMove();
    }

    // check for winning move
    if (turn >= 3) {
      // check center of board
      if (board[4] == currentMarker) {
        if (board[0] == currentMarker && board[8] == currentMarker) {
          winningMove();
        } else if (board[2] == currentMarker && board[6] == currentMarker) {
          winningMove();
        } else if (board[1] == currentMarker && board[7] == currentMarker) {
          winningMove();
        } else if (board[3] == currentMarker && board[5] == currentMarker) {
          winningMove();
        }
      }

      // check top-left corner
      if (board[0] == currentMarker) {
        if (board[1] == currentMarker && board[2] == currentMarker) {
          winningMove();
        } else if (board[3] == currentMarker && board[6] == currentMarker) {
          winningMove();
        }
      }

      // check bottom-right corner
      if (board[8] == currentMarker) {
        if (board[7] == currentMarker && board[6] == currentMarker) {
          winningMove();
        } else if (board[5] == currentMarker && board[2] == currentMarker) {
          winningMove();
        }
      }
    }
    toggleMarker();
  };

  const winningMove = () => {
    gameWon = currentMarker;
  };

  const tieMove = () => {
    gameWon = "T";
  };

  const isGameOver = () => {
    return gameWon != "";
  };

  return {
    board,
    addMarker,
    clear,
    isGameOver,
  };
})();

// displayController module
const displayController = (() => {
  let container = document.getElementById("container");
  let gameWindow = document.getElementById('gameWindow');
  let playerOne = document.getElementById('playerOne');
  let playerTwo = document.getElementById('playerTwo');

  const render = () => {
    createGameTiles(container);
  };

  // append gameboard elements to gameWindow
  const createGameTiles = () => {
    for (let i = 0, len = gameboard.board.length; i < len; i++) {
      let gameTile = document.createElement("div");
      gameTile.textContent = gameboard.board[i];
      gameTile.classList.add("square");
      gameWindow.appendChild(gameTile);

      addGameTileListener(gameTile, i);
    }
  };

  const addGameTileListener = (gameTile, index) => {
    gameTile.addEventListener("click", function () {
        if(gameboard.addMarker(index)){
            gameTile.textContent = gameboard.board[index];
            toggleMarkerIndicator();
        }
    });
  };
  
  const toggleMarkerIndicator = () => {
      playerOne.children[1].classList.toggle("currentMarker");
      playerTwo.children[1].classList.toggle("currentMarker");
  };

  return {
    render,
  };
})();

window.onload = function () {
  displayController.render();
};
