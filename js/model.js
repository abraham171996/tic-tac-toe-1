export default class Model {
  constructor() {
    this.playerTurn = "x";
    this.moves = 0;
    this.isGameOver = false;
    this.board = ["none", "none", "none", "none", "none", "none", "none", "none", "none"];
    this.alertShown = false; 
    this.eventListeners = [];
  }

play(y) {
    if (this.board[y] === "none" && !this.isGameOver) {
      this.board[y] = this.playerTurn;
      this.moves++;
      if (this.checkWinner() && !this.alertShown) {
        this.gameOver(y);
        this.alertShown = true;
      } else if (this.moves === 9 && !this.alertShown) {
        this.draw();
        this.alertShown = true;
      } else {
        this.playerTurn = this.playerTurn === "x" ? "o" : "x";
        this.emitEvent("boardUpdate", this.board);
      }
    }
  }

  checkWinner() {
    const winTypes = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of winTypes) {
      if (this.board[a] === this.board[b] && this.board[b] === this.board[c] && this.board[a] !== "none") {
        return true;
      }
    }

    return false;
  }

  gameOver(a) {
    this.isGameOver = true;
    this.winner = this.board[a];
    
  }

  draw() {
    this.isGameOver = true;
    this.emitEvent("draw");
  }

  reset() {
    this.playerTurn = "x";
    this.moves = 0;
    this.isGameOver = false;
    this.board = ["none", "none", "none", "none", "none", "none", "none", "none", "none"];
  }

  addEventListener(event, listener) {
    this.eventListeners.push({ event, listener });
  }

  emitEvent(event, data) {
    for (const listenerObj of this.eventListeners) {
      if (listenerObj.event === event) {
        listenerObj.listener(data);
      }
    }
  }
}
