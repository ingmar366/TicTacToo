class GameView {
  #cells = document.querySelectorAll(".cell");
  #gameField = document.querySelector(".game");

  // check for clicks on the game field area
  cellClickHanlder(hanlder) {
    this.#gameField.addEventListener("click", hanlder);
  }

  // setting the background image based on the input location and the input img
  setBackground(location, img) {
    location.style.backgroundImage = `url(${img})`;
  }

  // returning all the game cells with values
  getAllCellContent() {
    return this.#cells;
  }

  // clearing all the background images from the fields.
  clearMarkers() {
    this.#cells.forEach((cell) => {
      cell.style.backgroundImage = "";
    });
  }
}

export default new GameView();
