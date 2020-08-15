import axios from "axios";



// Axios =====================================================================

export const APICalls = {
  getGames: () => axios.get("/api/games"),
  getUserGames: id => axios.get(`/api/games/user/${id}`),
  createGame: gameDat => axios.post("/api/games/", gameDat),
  getGame: gameId => axios.get(`/api/games/${gameId}`),
  getActiveGame: gameId => axios.get(`/api/games/active/${gameId}`),
  getPlayerState: (gameId, user_id) => axios.get(`/api/games/playerState/${gameId}/${user_id}`)
}

// Dispatch Labels ===========================================================
export const RECEIVE_GAMES = "RECEIVE_GAMES";
export const RECEIVE_USER_GAMES = "RECEIVE_USER_GAMES";
export const RECEIVE_NEW_GAME = "RECEIVE_NEW_GAME";
export const RECEIVE_GAME = "RECEIVE_GAME";
export const RECEIVE_ACTIVE_GAME = "RECEIVE_ACTIVE_GAME";
export const RECEIVE_PLAYER_STATE = "RECEIVE_PLAYER_STATE";

// cards in play...
export const RECEIVE_NEW_CARD_IN_PLAY = "RECEIVE_NEW_CARD_IN_PLAY";


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

// cards in play
export const receiveNewCardInPlay = card => ({
  type: RECEIVE_NEW_CARD_IN_PLAY,
  card: card
})

// Dispatch Functions ========================================================
export const getGames = () => dispatch => APICalls.getGames()
  .then(games => dispatch(receiveGames(games)))
  .catch(err => console.log(err));

export const getGame = gameId => dispatch => APICalls.getGame(gameId)
  .then(game => dispatch(receiveGame(game)))
  .catch(err => console.log(err));

export const getActiveGame = (gameId, user_id) => dispatch => APICalls.getActiveGame(gameId, user_id)
  .then(game => dispatch(receiveActiveGame(game)))
  .catch(err => console.log(err));

export const getPlayerState = (gameId, user_id) => dispatch => APICalls.getPlayerState(gameId, user_id)
  .then(playerState => dispatch(receivePlayerState(playerState)))
  .catch(err => console.log(err));

export const getUserGames = id => dispatch => APICalls.getUserGames(id)
  .then(games => dispatch(receiveUserGames(games)))
  .catch(err => console.log(err));

export const createGame = gameDat => dispatch => APICalls.createGame(gameDat)
  .then(game => dispatch(receiveNewGame(game)))
  .catch(err => console.log(err));


// cards in play
export const updateCardsInPlay = (gameId, card) => dispatch => APICalls.updateCardsInPlay(gameId, card)
  .then(card => dispatch(receiveNewCardInPlay(card)))
  .catch(err => console.log(err));