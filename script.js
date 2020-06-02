// gameboard module
const gameboard = (() => {
    let board = new Array(9);

    board[0] = "X";

    return {
        board
    };
})();

// e.g. gameboard.add(3, 5) // 8

// displayController module
const displayController = (() => {
    const render = () => {
        let container = document.getElementById("container");
        
        for(let i = 0, len = gameboard.board.length; i < len; i++){
            let square = document.createElement('div');
            square.textContent = gameboard.board[i];
            square.classList.add('square');
            container.appendChild(square);
        }
    };

    return {
        render
    };
})();

// player factory
const player = () => {
    let _privVariable = 0;
    let publicVariable = 0;
    return () => {
        publicVariable;
    };
};

window.onload = function(){
    displayController.render();
};