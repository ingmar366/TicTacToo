class ModalView {
  #modal = document.querySelector(`.modal`);
  #overlay = document.querySelector(`.overlay`);
  #tie = document.querySelector(`.tie`);
  #start = document.querySelector(`.start`);
  #restart = document.querySelector(`.restart`);
  #restart__header = document.querySelector(`.restart__header`);

  // toggle the modal field.
  toggleModal() {
    this.#modal.classList.toggle(`hidden`);
    this.#overlay.classList.toggle(`hidden`);
  }

  // track all clicks on the modal field
  clickHandler(handler) {
    this.#modal.addEventListener(`click`, handler);
  }

  // removing hidden from the tie message
  showTie() {
    this.#tie.classList.remove(`hidden`);
  }
  // add hidden to classes for the tie message
  hideTie() {
    this.#tie.classList.add(`hidden`);
  }

  //  applying hidden to the start message
  hideStart() {
    this.#start.classList.add(`hidden`);
  }

  //  removing hidden from the restart message
  showRestart(player) {
    this.#restart.classList.remove(`hidden`);
    this.#restart__header.textContent = `${player} WON!`;
  }

  //  adding hidden to the restart message.
  hideRestart() {
    this.#restart.classList.add(`hidden`);
  }
}

export default new ModalView();
