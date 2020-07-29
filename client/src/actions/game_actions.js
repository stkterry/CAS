import axios from "axios";



// Axios =====================================================================

export const APICalls = {
  getGames: () => axios.get("/api/games"),
  getUserGames: id => axios.get(`/api/games/user/${id}`),
  createGame: gameDat => axios.post("/api/games/", gameDat),
  getGame: game_id => axios.get(`/api/games/${game_id}`),
  getActiveGame: (game_id, user_id=null) => axios.get(`/api/games/active/${game_id}/${user_id}`),
  getPlayerState: (game_id, user_id) => axios.get(`/api/games/playerState/${game_id}/${user_id}`)
}

// Dispatch Labels ===========================================================
export const RECEIVE_GAMES = "RECEIVE_GAMES";
export const RECEIVE_USER_GAMES = "RECEIVE_USER_GAMES";
export const RECEIVE_NEW_GAME = "RECEIVE_NEW_GAME";
export const RECEIVE_GAME = "RECEIVE_GAME";
export const RECEIVE_ACTIVE_GAME = "RECEIVE_ACTIVE_GAME";
export const RECEIVE_PLAYER_STATE = "RECEIVE_PLAYER_STATE";


// Dispatches ================================================================
export const receiveGames = games => ({
  type: RECEIVE_GAMES,
  games: games
});

export const receiveUserGames = games => ({
  type: RECEIVE_USER_GAMES,
  games: games
})

export const receiveNewGame = game => ({
  type: RECEIVE_NEW_GAME,
  game: game
});

export const receiveGame = game => ({
  type: RECEIVE_GAME,
  game: game
});

export const receiveActiveGame = game => ({
  type: RECEIVE_ACTIVE_GAME,
  game: game
})

export const receivePlayerState = playerState => ({
  type: RECEIVE_PLAYER_STATE,
  playerState: playerState
})

// Dispatch Functions ========================================================
export const getGames = () => dispatch => APICalls.getGames()
  .then(games => dispatch(receiveGames(games)))
  .catch(err => console.log(err));

export const getGame = game_id => dispatch => APICalls.getGame(game_id)
  .then(game => dispatch(receiveGame(game)))
  .catch(err => console.log(err));

export const getActiveGame = (game_id, user_id) => dispatch => APICalls.getActiveGame(game_id, user_id)
  .then(game => dispatch(receiveActiveGame(game)))
  .catch(err => console.log(err));

export const getPlayerState = (game_id, user_id) => dispatch => APICalls.getPlayerState(game_id, user_id)
  .then(playerState => dispatch(receivePlayerState(playerState)))
  .catch(err => console.log(err));

export const getUserGames = id => dispatch => APICalls.getUserGames(id)
  .then(games => dispatch(receiveUserGames(games)))
  .catch(err => console.log(err));

export const createGame = gameDat => dispatch => APICalls.createGame(gameDat)
  .then(game => dispatch(receiveNewGame(game)))
  .catch(err => console.log(err));