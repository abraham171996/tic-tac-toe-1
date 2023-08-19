class Model {
  constructor() {
    this.board = ["none", "none", "none", "none", "none", "none", "none", "none", "none"];
    this.playerTurn = "X";
    this.moves = false;
    this.isGameOver = false;
    this.alertShown = false; 
  }
  ;
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
        this.playerTurn = this.playerTurn === "X" ? "O" : "X";
        
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
    this.alertShown = false; 
    if (this.winner) {
      alert(`Player ${this.winner.toUpperCase()} wins!`);
    }
  }

  draw() {
    this.isGameOver = true;
    this.emitEvent("draw");
    this.alertShown = false; 
  }
  playAgain(element) {
    const alertElement = document.querySelector(".alert");
    if (alertElement) {
      alertElement.parentNode.removeChild(alertElement);
    }

    this.reset();
    this.isGameOver = false;
    
    for (let k = 0; k < element.length; k++) {
      element[k].parentNode.classList.remove("activeBox");
    }
  }

  reset() {
    this.playerTurn = "X";
    this.moves = 0;
    this.isGameOver = false;
    this.alertShown = false;
    this.board = ["none", "none", "none", "none", "none", "none", "none", "none", "none"];
  }
 

}


export default Model