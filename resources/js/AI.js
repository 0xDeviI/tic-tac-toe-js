class TTT_AI {
    __constructor(debug) {
        this.debug = debug;
    }

    setDebug(debug) {
        this.debug = debug;
    }

    action(gameBoard) {
        if (this.debug) {
            console.log('AI is thinking...');
        }
        // AI stuff
        // tactically return for example: return [0, 0];
    }
}