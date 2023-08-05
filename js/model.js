export default class Model {
    constructor() {
      this.playerTurn = "x";
      this.moves = 0;
      this.isGameOver = false;
      this.board = ["none", "none", "none", "none", "none", "none", "none", "none", "none"];
    }
  
    play(y) {
      if (this.board[y] === "none" && !this.isGameOver) {
        this.board[y] = this.playerTurn;
        this.moves++;
        if (this.checkWinner()) {
          this.gameOver(y);
        } else if (this.moves === 9) {
          this.draw();
        } else {
          this.playerTurn = this.playerTurn === "x" ? "o" : "x";
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
    }
  
    reset() {
      this.playerTurn = "x";
      this.moves = 0;
      this.isGameOver = false;
      this.board = ["none", "none", "none", "none", "none", "none", "none", "none", "none"];
    }
  }