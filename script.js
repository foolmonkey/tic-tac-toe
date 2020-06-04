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

  const addMarker = (index) => {
    if (board[index] == null) {
      board[index] = currentMarker;
      toggleMarker();
    }
  };

  const clear = () => {
    board.splice(0, board.length);
  };

  const toggleMarker = () => {
      if(currentMarker == "X"){
          currentMarker = "O";
      } else{
          currentMarker = "X";
      }
  };

  return {
    board,
    addMarker,
    clear,
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
    gameTile.addEventListener('click', function(){
        gameboard.addMarker(index, "X");
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
