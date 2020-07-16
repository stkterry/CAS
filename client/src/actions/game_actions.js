import axios from "axios";



// Axios =====================================================================

export const APICalls = {
  getGames: () => axios.get("/api/games"),
  getUserGames: id => axios.get(`/api/games/user/${id}`),
  createGame: gameDat => axios.post("/api/games/", gameDat)
}

// Dispatch Labels ===========================================================
export const RECEIVE_GAMES = "RECEIVE_GAMES";
export const RECEIVE_USER_GAMES = "RECEIVE_USER_GAMES";
export const RECEIVE_NEW_GAME = "RECEIVE_NEW_GAME";


// Dispatches ================================================================
export const receiveGames = games => ({
  type: RECEIVE_GAMES,
  games: games
});

export const receiveNewGame = game => ({
  type: RECEIVE_NEW_GAME,
  game
});

// Dispatch Functions ========================================================
export const getGames = () => dispatch => APICalls.getGames()
  .then(games => dispatch(receiveGames(games)))
  .catch(err => console.log(err));

export const getUserGames = id => dispatch => APICalls.getUserGames(id)
  .then(games => dispatch(receiveUserGames(games)))
  .catch(err => console.log(err));

export const createGame = gameDat => dispatch => APICalls.createGame(gameDat)
  .then(game => dispatch(receiveNewGame(game)))
  .catch(err => console.log(err));