export default class View {
  constructor() {
    this.spanElements = document.getElementsByTagName("span");
    this.eventListeners = [];
    this.init();
    this.initRestartButton();
  }

  init() {
    for (let i = 0; i < this.spanElements.length; i++) {
      this.spanElements[i].addEventListener("click", () => this.emitClickEvent(i));
    }
  }

  emitClickEvent(index) {
    this.emitEvent("cellClick", index);
  }

  updateBoard(board, isGameOver, winner) {
    for (let i = 0; i < this.spanElements.length; i++) {
      this.spanElements[i].innerHTML = board[i] === "none" ? "&nbsp;" : board[i];
    }

    const alertElement = document.querySelector(".alert");
    if (isGameOver && alertElement) {
      if (winner) {
        this.showAlert(`Player ${winner.toUpperCase()} wins!`);
      } else {
        this.showAlert("It's a draw!");
      }
    } else if (!isGameOver && alertElement) {
      alertElement.parentNode.removeChild(alertElement); // Hide the alert
    }
  }


  showAlert(message) {
    const restartButton = '<button>Restart&nbsp;</button>';
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
      restartButtonElement.removeEventListener("click", () => this.emitEvent("restartClick"));
      restartButtonElement.addEventListener("click", () => this.emitEvent("restartClick"));
    }
  }
  

  onRestartClick() {
    const alertElement = document.querySelector(".alert");
    if (alertElement) {
      alertElement.parentNode.removeChild(alertElement);
    }
    this.view.reset();
    this.view.updateBoard(this.model.board, this.model.isGameOver, this.model.winner);
  }
  reset() {
    for (let i = 0; i < this.spanElements.length; i++) {
      this.spanElements[i].innerHTML = "&nbsp;";
    }
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
