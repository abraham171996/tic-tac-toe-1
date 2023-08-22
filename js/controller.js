class Controller{
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  
  init() {
    this.view.onHandleCilckSpan(this.onClickSpan.bind(this));
    this.view.onRestartClick(this.restartGame.bind(this));
  }
  restartGame() {
    const alertElement = document.querySelector(".alert");
    if (alertElement) {
      alertElement.parentNode.removeChild(alertElement);
    }

    this.model.reset();
    this.view.updateBoard(this.model.board, this.model.isGameOver, this.model.winner);
  }

  

  onClickSpan(event) {
    const spanElement = event.target;
    const index = Array.from(this.view.spanElements).indexOf(spanElement);

    if (index !== -1) {
      this.model.play(index);
      this.view.updateBoard(this.model.board, this.model.isGameOver, this.model.winner);
    }
  }
}
export default Controller
