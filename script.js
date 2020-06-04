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
    }
  };

  const clear = () => {
    board.splice(0, board.length);
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
    console.log(currentMarker + " Wins!" + " gamewon= " + gameWon);
  };

  const tieMove = () => {
    gameWon = "T";
    console.log("Tie!");
  };

  const isGameOver = () => {
      return gameWon != '';
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
  const render = () => {
    let container = document.getElementById("container");
    container.innerHTML = "";

    createGameTiles(container);
  };

  // append gameboard elements to container
  const createGameTiles = (container) => {
    for (let i = 0, len = gameboard.board.length; i < len; i++) {
      let gameTile = document.createElement("div");
      gameTile.textContent = gameboard.board[i];
      gameTile.classList.add("square");
      container.appendChild(gameTile);

      addGameTileListener(gameTile, i);
    }
  };

  const addGameTileListener = (gameTile, index) => {
    gameTile.addEventListener("click", function () {
      gameboard.addMarker(index);
      gameTile.textContent = gameboard.board[index];
    });
  };

  return {
    render,
  };
})();

window.onload = function () {
  displayController.render();
};
