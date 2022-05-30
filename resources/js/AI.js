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

    action(gameBoard) {
        if (this.debug) {
            console.log('AI is thinking...');
        }
        // AI stuff
        // tactically return for example: return [0, 0];
        return this.randomEmptyPlace(gameBoard);
    }
}