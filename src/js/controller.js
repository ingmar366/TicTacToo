import * as model from "./model";
import gameView from "./views/gameView";
import playerView from "./views/playerView";
import modalView from "./views/modalView";

////////////////////////////////////////////////////////////
//                                                        //
//                     START/RESTART                      //
//                                                        //
////////////////////////////////////////////////////////////

// keep track of the clicks on the modal when this is active
const modalClick = function (e) {
  e.preventDefault();

  // hiding modal when start button has been clicked
  const targetClasses = e.target.classList[1];
  if (targetClasses === "start__button") {
    modalView.toggleModal();
    modalView.hideStart();
  }

  // reseting and clearing everything when start button has been clicked
  if (targetClasses === "restart__button") {
    gameView.clearMarkers();
    modalView.toggleModal();
    modalView.hideRestart();
    modalView.hideTie();
    model.reset();
    playerView.resetStartPlayer();
  }
};

////////////////////////////////////////////////////////////
//                                                        //
//                        MODAL                           //
//                                                        //
////////////////////////////////////////////////////////////
// show the modal and tie information when all fields are filled but no winner
const tieHandler = function () {
  modalView.toggleModal();
  modalView.showTie();
};
////////////////////////////////////////////////////////////
//                                                        //
//                        WINNING                         //
//                                                        //
////////////////////////////////////////////////////////////

// tracking the location that the player clicks and which player is active
const updateFilledLocation = function (player) {
  const content = gameView.getAllCellContent();
  // array with all filled locations of the current player
  let filledArr;

  // places the marker
  if (player === 1) filledArr = filledCells(content, "circle");
  if (player === 2) filledArr = filledCells(content, "cross");

  // update the array of the current player
  model.updatePlayerArray(`player${player}`, filledArr);

  // check if the current player won
  const win = checkPlayerWon(player);
  return win;
};

// checking which cells are filled based on the symbol of active player
const filledCells = function (cells, symbol) {
  // return the number of the location where the background image is same as current player
  content = Object.entries(cells).reduce((acc, item) => {
    if (
      window.getComputedStyle(item[1], false).backgroundImage.includes(symbol)
    )
      acc.push(parseInt(item[1].dataset.set));
    return acc;
  }, []);

  return content;
};

// check if the current player has won and show modal if this is the case
const checkPlayerWon = function (player) {
  const winningData = model.winningArray;
  // comparing the current array of the player with the options for winning
  const info = winningData.filter((item) =>
    item.every((v) => model.state[`player${player}`].includes(v))
  );
  // checking if one of the values return true, in this case it will trigger the modal
  if (info.length > 0) {
    modalView.toggleModal();
    modalView.showRestart(`player ${player}`);
    // value returns to prefent the trigger of a tie when a player win.
    return 1;
  }
  return 0;
};

////////////////////////////////////////////////////////////
//                                                        //
//                        MARKERS                         //
//                                                        //
////////////////////////////////////////////////////////////
// placing the marker on empty spots
const placeMarker = function (e) {
  // check for the current click location
  const clickLocation = e.target;
  const currentActivePlayer = model.state.activePlayer;
  //   check for clicks outside of the cells
  if (clickLocation.classList.contains("game")) return;

  //   check if location is emtpy
  if (window.getComputedStyle(clickLocation, false).backgroundImage !== "none")
    return;

  // based on player depends on which background is selected
  if (model.state.activePlayer === 1) {
    gameView.setBackground(clickLocation, "circle.deebfa26.svg");
    // switching to other player
    model.updateActivePlayer(2);
  } else {
    gameView.setBackground(clickLocation, "cross.64d8e85c.svg");
    // switching to other player
    model.updateActivePlayer(1);
  }
  // check if a player has won so far, returns 1 or 0
  const winning = updateFilledLocation(currentActivePlayer);

  // updating the interface based on the new active player
  playerView.updateActivePlayer();

  // after placing a marker reduce the empty fields
  model.withDrawlEmptyField();

  // checking if there are still empty fields available
  if (model.state.emptyFields === 0 && winning === 0) {
    tieHandler();
  }
};

////////////////////////////////////////////////////////////
//                                                        //
//                        init                            //
//                                                        //
////////////////////////////////////////////////////////////
// set up event handlers when first initializing the code.
const init = function () {
  modalView.clickHandler(modalClick);
  gameView.cellClickHanlder(placeMarker);
};

init();
