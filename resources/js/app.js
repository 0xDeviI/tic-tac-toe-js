var cells = document.querySelectorAll('.board-cell');
var modal = document.getElementById("startup-modal");
var mainContainer = document.getElementById("main-container");
var startAIGameBtn = document.getElementById("start-ai-game-btn");
var startFriendGameBtn = document.getElementById("start-friend-game-btn");
var headerStatus = document.getElementById("game-status");
var gameBoardElement = document.getElementById("game-board");
var debug = true;
var canPlay = true;
var playAI = true;

var gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

var _gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

var _AI = new TTT_AI(debug);

var put = (player, id) => {
    var _id = id;
    for (var i = 0; i < gameBoard.length; i++) {
        for (var j = 0; j < gameBoard[i].length; j++) {
            if (j == _id[0] && i == _id[1]) {
                gameBoard[_id[0]][_id[1]] = player;
                if (debug)
                    console.log(`${player} placed at ${_id}`);
            }
        }
    }
}

var turn = ['X', 'O'];
var currentTurn = 0;

var x = {
    'win': 0,
    'lose': 0,
    'x_win': document.getElementById("x-win"),
    'x_lose': document.getElementById("x-lose"),
    'winner': () => {
        x.win++;
        x.x_win.innerHTML = `Win: ${x.win}`;
        if (debug)
            console.log(`X won!`);
    },
    'loser': () => {
        x.lose++;
        x.x_lose.innerHTML = `Lose: ${x.lose}`;
    }
};

var o = {
    'win': 0,
    'lose': 0,
    'o_win': document.getElementById("o-win"),
    'o_lose': document.getElementById("o-lose"),
    'winner': () => {
        o.win++;
        o.o_win.innerHTML = `Win: ${o.win}`;
        if (debug)
            console.log(`O won!`);
    },
    'loser': () => {
        o.lose++;
        o.o_lose.innerHTML = `Lose: ${o.lose}`;
    }
};

var getCurrentTurn = () => {
    return turn[currentTurn];
}

var showModal = () => {
    mainContainer.classList.add("blury");
    mainContainer.disabled = true;
    modal.style.display = "block";
}

var hideModal = () => {
    modal.style.display = "none";
    mainContainer.classList.remove("blury");
    mainContainer.disabled = false;
}

var startGame = () => {
    hideModal();
    headerStatus.innerHTML = `${getCurrentTurn()}'s turn`;
}

var initializeGame = () => {
    showModal();
    startAIGameBtn.addEventListener("click", function() {
        playAI = true;
        startGame();
    });

    startFriendGameBtn.addEventListener("click", function() {
        playAI = false;
        startGame();
    });
}

var idToIndex = (cell) => {
    var id = cell.id.replace('cell-', '');
    var idTable = {
        '1': [0, 0],
        '2': [0, 1],
        '3': [0, 2],
        '4': [1, 0],
        '5': [1, 1],
        '6': [1, 2],
        '7': [2, 0],
        '8': [2, 1],
        '9': [2, 2]
    };
    return idTable[id];
}

var oAction = () => {
    // perform some AI stuff
    if (canPlay)
        setTimeout(() => {
            if (debug)
                _AI.action(gameBoard);
            currentTurn--;
            statusReview();
        }, 2000);
}

var winCheck = () => {
    if (gameBoard[0][0] !== "" && gameBoard[0][0] === gameBoard[0][1] && gameBoard[0][0] === gameBoard[0][2]) {
        return gameBoard[0][0];
    } else if (gameBoard[1][0] !== "" && gameBoard[1][0] === gameBoard[1][1] && gameBoard[1][0] === gameBoard[1][2]) {
        return gameBoard[1][0];
    } else if (gameBoard[2][0] !== "" && gameBoard[2][0] === gameBoard[2][1] && gameBoard[2][0] === gameBoard[2][2]) {
        return gameBoard[2][0];
    } else if (gameBoard[0][0] !== "" && gameBoard[0][0] === gameBoard[1][0] && gameBoard[0][0] === gameBoard[2][0]) {
        return gameBoard[0][0];
    } else if (gameBoard[0][1] !== "" && gameBoard[0][1] === gameBoard[1][1] && gameBoard[0][1] === gameBoard[2][1]) {
        return gameBoard[0][1];
    } else if (gameBoard[0][2] !== "" && gameBoard[0][2] === gameBoard[1][2] && gameBoard[0][2] === gameBoard[2][2]) {
        return gameBoard[0][2];
    } else if (gameBoard[0][0] !== "" && gameBoard[0][0] === gameBoard[1][1] && gameBoard[0][0] === gameBoard[2][2]) {
        return gameBoard[0][0];
    } else if (gameBoard[0][2] !== "" && gameBoard[0][2] === gameBoard[1][1] && gameBoard[0][2] === gameBoard[2][0]) {
        return gameBoard[0][2];
    } else {
        return false;
    }
}

var disableGame = () => {
    gameBoardElement.disabled = true;
    canPlay = false;
}

var enableGame = () => {
    gameBoardElement.disabled = false;
    canPlay = true;
}

var clearBoard = () => {
    cells.forEach(element => {
        element.classList.remove("x-filled");
        element.classList.remove("o-filled");
    });
    gameBoard = _gameBoard;
    _gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentTurn = 0; // review needed
}

var restartGame = () => {
    setTimeout(() => {
        clearBoard();
        enableGame();
        statusReview();
    }, 2000);
}

var boardStatusCheck = () => {
    headerStatus.innerHTML = `${getCurrentTurn()}'s turn`;
}

var statusReview = () => {
    var winner = winCheck();
    if (winner !== false) {
        if (winner === 'X') {
            x.winner();
            o.loser();
            headerStatus.innerHTML = `X wins!`;
        } else {
            o.winner();
            x.loser();
            headerStatus.innerHTML = `O wins!`;
        }
        disableGame();
        restartGame();
    } else
        boardStatusCheck();
}

cells.forEach(element => {
    element.addEventListener("click", function() {
        if (element.classList.contains("x-filled") || element.classList.contains("o-filled")) {
            return;
        } else {
            if (canPlay) {
                if (playAI) {
                    if (getCurrentTurn() == 'X') {
                        element.classList.add("x-filled");
                        put('X', idToIndex(element));
                        currentTurn++;
                        statusReview();
                        oAction();
                    } else {
                        notify("Wait!", "It's O's turn right now.", 3000);
                    }
                } else {
                    if (getCurrentTurn() == 'X') {
                        element.classList.add("x-filled");
                        put('X', idToIndex(element));
                        currentTurn++;
                        statusReview();
                    } else if (getCurrentTurn() == 'O') {
                        element.classList.add("o-filled");
                        put('O', idToIndex(element));
                        currentTurn--;
                        statusReview();
                    }
                }
            }
        }
    });
});

(function() {
    initializeGame();
})();