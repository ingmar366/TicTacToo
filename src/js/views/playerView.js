class PlayerView {
  #player1 = document.querySelector(".player1");
  #player2 = document.querySelector(".player2");

  // toggleing the active class to the players
  updateActivePlayer() {
    this.#player1.classList.toggle(`active`);
    this.#player2.classList.toggle(`active`);
  }

  // resetting players back to player 1 active.
  resetStartPlayer() {
    this.#player1.classList.add(`active`);
    this.#player2.classList.remove(`active`);
  }
}

export default new PlayerView();
