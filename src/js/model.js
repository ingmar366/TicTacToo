// base data for starting the game and keeping track of the clicked locations
export const state = {
  emptyFields: 9,
  activePlayer: 1,
  player1: [],
  player2: [],
};

// array of cominations that make it possible to win the game
export const winningArray = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// updating the value of the active player
export const updateActivePlayer = function (updatedValue) {
  state.activePlayer = updatedValue;
};

// withdrawing an active field of state
export const withDrawlEmptyField = function () {
  state.emptyFields -= 1;
};

// updates the players array based on the selected player and the new input array
export const updatePlayerArray = function (player, arr) {
  state[player] = arr;
};

// reset all the data back to the begin data to make restart possible.
export const reset = function () {
  state.emptyFields = 9;
  state.activePlayer = 1;
  state.player1 = [];
  state.player2 = [];
};
