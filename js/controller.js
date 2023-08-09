export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.model.addEventListener("gameOver", (data) => this.onGameOver(data));
    this.model.addEventListener("draw", () => this.onDraw());
    this.model.addEventListener("boardUpdate", (board) => this.onBoardUpdate(board));
    this.view.addEventListener("cellClick", (data) => this.onCellClick(data));
    this.view.addEventListener("restartClick", () => this.onRestartClick());
  }

  onBoardUpdate(board) {
    this.view.updateBoard(board, this.model.isGameOver, this.model.winner);
  }

  onCellClick(index) {
    if (!this.model.isGameOver) {
      this.model.play(index);
      this.view.updateBoard(this.model.board, this.model.isGameOver, this.model.winner);
  
      if (this.model.isGameOver) {
        if (this.model.winner) {
          this.view.showAlert(`Player ${this.model.winner.toUpperCase()} wins!`);
        } else {
          this.view.showAlert("It's a draw!");
        }
      }
    }
  }

  onRestartClick() {
    this.model.reset();
    this.view.reset(); // Call the reset method to clear the board
    this.view.updateBoard(this.model.board, this.model.isGameOver, this.model.winner);
    this.model.alertShown = false; // Reset the flag to allow alerts to show again
  }

  onGameOver(winner) {
    if (!this.model.alertShown) {
      this.view.showAlert(`Player ${winner.toUpperCase()} wins!`);
      this.model.alertShown = true;
    }
  }

  onDraw() {
    if (!this.model.alertShown) {
      this.view.showAlert("It's a draw!");
      this.model.alertShown = true;
    }
  }
}




