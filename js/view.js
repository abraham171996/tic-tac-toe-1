export default class View {
    constructor(model) {
        this.model = model;
        this.spanElements = document.getElementsByTagName("span");
        this.init();
      }
    
      init() {
        for (let i = 0; i < this.spanElements.length; i++) {
          this.spanElements[i].addEventListener("click", () => this.onCellClick(i));
        }
      }
    
      onCellClick(index) {
        if (!this.model.isGameOver) {
          this.model.play(index);
          this.updateBoard();
        }
      }
  
    updateBoard() {
      for (let i = 0; i < this.spanElements.length; i++) {
        this.spanElements[i].innerHTML = this.model.board[i] === "none" ? "&nbsp;" : this.model.board[i];
      }
  
      if (this.model.isGameOver) {
        if (this.model.winner) {
          this.showAlert(`Player ${this.model.winner.toUpperCase()} wins!`);
        } else {
          this.showAlert("It's a draw!");
        }
      }
    }
  
   
  showAlert(message) {
    const restartButton = '<button>Restart&nbsp;</button>'; // Define the restartButton here
    const alertElement = `<b>${message}</b><br><br>${restartButton}`;
    const div = document.createElement("div");
    div.className = "alert";
    div.innerHTML = alertElement;
    document.getElementsByTagName("body")[0].appendChild(div);
    this.initRestartButton();
  }
  
    initRestartButton() {
      const restartButtonElement = document.querySelector(".alert button");
      if (restartButtonElement) {
        restartButtonElement.addEventListener("click", () => this.onRestartClick());
      }
    }
  
    onRestartClick() {
      const alertElement = document.querySelector(".alert");
      if (alertElement) {
        alertElement.parentNode.removeChild(alertElement);
      }
      this.model.reset();
      this.updateBoard();
    }
  }
