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

function put(player, id) {
    var _id = id;
    for (var i = 0; i < gameBoard.length; i++) {
        for (var j = 0; j < gameBoard[i].length; j++) {
            if (j == _id[0] && i == _id[1]) {
                gameBoard[_id[0]][_id[1]] = player;
                var _element = document.getElementById(indexToId(_id));
                _element.classList.add(`${player.toLowerCase()}-filled`);
                if (debug)
                    console.log(`${player} placed at ${_id}`);
            }
        }
    }
}

var turn = ['X', 'O'];
var human = 'X';
var AI = 'O';
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

function getCurrentTurn() {
    return turn[currentTurn];
}

function showModal() {
    mainContainer.classList.add("blury");
    mainContainer.disabled = true;
    modal.style.display = "block";
}

function hideModal() {
    modal.style.display = "none";
    mainContainer.classList.remove("blury");
    mainContainer.disabled = false;
}

function startGame() {
    hideModal();
    headerStatus.innerHTML = `${getCurrentTurn()}'s turn`;
}

function initializeGame() {
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

function indexToId(index) {
    var indexTable = {
        '0,0': '1',
        '0,1': '2',
        '0,2': '3',
        '1,0': '4',
        '1,1': '5',
        '1,2': '6',
        '2,0': '7',
        '2,1': '8',
        '2,2': '9'
    };
    return `cell-${indexTable[index.toString()]}`;
}

function idToIndex(cell) {
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

function oAction() {
    // perform some AI stuff
    if (canPlay)
        if (debug)
            put('O', _AI.action(gameBoard));
    currentTurn = 0;
    statusReview();
}

function allCellsFilled() {
    for (var i = 0; i < gameBoard.length; i++) {
        for (var j = 0; j < gameBoard[i].length; j++) {
            if (gameBoard[i][j] == '')
                return false;
        }
    }
    return true;
}

function highlightCell(cells) {
    cells.forEach(element => {
        element.classList.add('highlighted-cell');
    });
}

function equals3(a, b, c) {
    return a == b && b == c && a != '';
}

function checkWinner(board) {
    if (equals3(board[0][0], board[0][1], board[0][2])) {
        return board[0][0];
    } else if (equals3(board[1][0], board[1][1], board[1][2])) {
        return board[1][0];
    } else if (equals3(board[2][0], board[2][1], board[2][2])) {
        return board[2][0];
    } else if (equals3(board[0][0], board[1][0], board[2][0])) {
        return board[0][0];
    } else if (equals3(board[0][1], board[1][1], board[2][1])) {
        return board[0][1];
    } else if (equals3(board[0][2], board[1][2], board[2][2])) {
        return board[0][2];
    } else if (equals3(board[0][0], board[1][1], board[2][2])) {
        return board[0][0];
    } else if (equals3(board[0][2], board[1][1], board[2][0])) {
        return board[0][2];
    } else if (allCellsFilled()) {
        return 'tie';
    } else {
        return false;
    }
}

function winCheck() {
    if (equals3(gameBoard[0][0], gameBoard[0][1], gameBoard[0][2])) {
        highlightCell([document.getElementById(indexToId([0, 0])), document.getElementById(indexToId([0, 1])), document.getElementById(indexToId([0, 2]))]);
        return gameBoard[0][0];
    } else if (equals3(gameBoard[1][0], gameBoard[1][1], gameBoard[1][2])) {
        highlightCell([document.getElementById(indexToId([1, 0])), document.getElementById(indexToId([1, 1])), document.getElementById(indexToId([1, 2]))]);
        return gameBoard[1][0];
    } else if (equals3(gameBoard[2][0], gameBoard[2][1], gameBoard[2][2])) {
        highlightCell([document.getElementById(indexToId([2, 0])), document.getElementById(indexToId([2, 1])), document.getElementById(indexToId([2, 2]))]);
        return gameBoard[2][0];
    } else if (equals3(gameBoard[0][0], gameBoard[1][0], gameBoard[2][0])) {
        highlightCell([document.getElementById(indexToId([0, 0])), document.getElementById(indexToId([1, 0])), document.getElementById(indexToId([2, 0]))]);
        return gameBoard[0][0];
    } else if (equals3(gameBoard[0][1], gameBoard[1][1], gameBoard[2][1])) {
        highlightCell([document.getElementById(indexToId([0, 1])), document.getElementById(indexToId([1, 1])), document.getElementById(indexToId([2, 1]))]);
        return gameBoard[0][1];
    } else if (equals3(gameBoard[0][2], gameBoard[1][2], gameBoard[2][2])) {
        highlightCell([document.getElementById(indexToId([0, 2])), document.getElementById(indexToId([1, 2])), document.getElementById(indexToId([2, 2]))]);
        return gameBoard[0][2];
    } else if (equals3(gameBoard[0][0], gameBoard[1][1], gameBoard[2][2])) {
        highlightCell([document.getElementById(indexToId([0, 0])), document.getElementById(indexToId([1, 1])), document.getElementById(indexToId([2, 2]))]);
        return gameBoard[0][0];
    } else if (equals3(gameBoard[0][2], gameBoard[1][1], gameBoard[2][0])) {
        highlightCell([document.getElementById(indexToId([0, 2])), document.getElementById(indexToId([1, 1])), document.getElementById(indexToId([2, 0]))]);
        return gameBoard[0][2];
    } else if (allCellsFilled()) {
        return 'tie';
    } else {
        return false;
    }
}

function disableGame() {
    gameBoardElement.disabled = true;
    canPlay = false;
}

function enableGame() {
    gameBoardElement.disabled = false;
    canPlay = true;
    if (playAI)
        oAction();
}

function clearBoard() {
    cells.forEach(element => {
        element.classList.remove("x-filled");
        element.classList.remove("o-filled");
        element.classList.remove("highlighted-cell");
    });
    gameBoard = _gameBoard;
    _gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    // random number between 0 and 1
    currentTurn = Math.floor(Math.random() * 2);
}

function restartGame() {
    setTimeout(() => {
        clearBoard();
        enableGame();
        statusReview();
    }, 2000);
}

function boardStatusCheck() {
    headerStatus.innerHTML = `${getCurrentTurn()}'s turn`;
}

function statusReview() {
    var winner = winCheck();
    if (winner !== false) {
        if (winner === 'tie') {
            headerStatus.innerHTML = `It's a tie!`;
        } else {
            if (winner === 'X') {
                x.winner();
                o.loser();
                headerStatus.innerHTML = `X wins!`;
            } else {
                o.winner();
                x.loser();
                headerStatus.innerHTML = `O wins!`;
            }
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
                        currentTurn = 1;
                        statusReview();
                        oAction();
                    } else {
                        notify("Wait!", "It's O's turn right now.", 3000);
                    }
                } else {
                    if (getCurrentTurn() == 'X') {
                        element.classList.add("x-filled");
                        put('X', idToIndex(element));
                        currentTurn = 1;
                        statusReview();
                    } else if (getCurrentTurn() == 'O') {
                        element.classList.add("o-filled");
                        put('O', idToIndex(element));
                        currentTurn = 0;
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