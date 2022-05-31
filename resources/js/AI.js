class TTT_AI {
    __constructor(debug) {
        this.debug = debug;
    }

    setDebug(debug) {
        this.debug = debug;
    }

    randomEmptyPlace(gameBoard) {
        var emptyPlaces = [];
        for (var i = 0; i < gameBoard.length; i++) {
            for (var j = 0; j < gameBoard[i].length; j++) {
                if (gameBoard[i][j] == '') {
                    emptyPlaces.push([i, j]);
                }
            }
        }
        if (emptyPlaces.length == 0) {
            return false;
        } else {
            var randomIndex = Math.floor(Math.random() * emptyPlaces.length);
            return emptyPlaces[randomIndex];
        }
    }

    scores = {
        'O': 10,
        'X': -10,
        'tie': 0
    }

    minimax(gameBoard, depth, isMaximizing) {
        // minimax function
        let aiGameBoard = gameBoard;
        let result = checkWinner(aiGameBoard);
        if (result !== false) {
            return this.scores[result];
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < aiGameBoard.length; i++) {
                for (let j = 0; j < aiGameBoard[i].length; j++) {
                    if (aiGameBoard[i][j] == '') {
                        aiGameBoard[i][j] = 'O';
                        let score = this.minimax(aiGameBoard, depth + 1, false);
                        aiGameBoard[i][j] = '';
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < aiGameBoard.length; i++) {
                for (let j = 0; j < aiGameBoard[i].length; j++) {
                    if (aiGameBoard[i][j] == '') {
                        aiGameBoard[i][j] = 'X';
                        let score = this.minimax(aiGameBoard, depth + 1, true);
                        aiGameBoard[i][j] = '';
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }

    pickBestMove(gameBoard) {
        let ai = 'O'
        let bestScore = -Infinity;
        let aiGameBoard = gameBoard;
        var bestMove;
        for (let i = 0; i < aiGameBoard.length; i++) {
            for (let j = 0; j < aiGameBoard[i].length; j++) {
                if (aiGameBoard[i][j] == '') {
                    aiGameBoard[i][j] = ai;
                    let score = this.minimax(aiGameBoard, 0, false);
                    aiGameBoard[i][j] = '';
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = [i, j];
                    }
                }
            }
        }
        return bestMove;
    }

    action(gameBoard) {
        if (this.debug) {
            console.log('AI is thinking...');
        }
        let bestMove = this.pickBestMove(gameBoard);
        console.log(bestMove);
        return bestMove;
    }
}