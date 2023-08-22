class View {
  constructor() {
    this.spanElements  = document.querySelectorAll("span")
    this.restart_btn = document.querySelector(".restart-btn");  
    
  }
  onHandleCilckSpan(callback){
        this.spanElements.forEach(span=>span.addEventListener("click",callback))
  }
  onRestartClick(callback) {
    this.restart_btn.addEventListener("click", () => {
      callback();
      this.spanElements.forEach((span) => (span.textContent = "")); 
    });
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
}
export default View