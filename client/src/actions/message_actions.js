import axios from "axios";



// Axios =====================================================================

export const APICalls = {
  getAll: () => axios.get("/api/messages/"), // Not in use...
  getGameMessages: gameId => axios.get(`/api/messages/game/${gameId}`), // This and the one below do the same thing, just differently
  getMessagesByGameId: (gameId) => axios.get(`/api/messages/game_id/${gameId}`),
  getOne: _id => axios.get(`/api/messages/${_id}`),
  postMessage: messageDat => axios.post("/api/messages/", messageDat)
}


// Dispatch Labels ===========================================================

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES'; // Not in use...
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const RECEIVE_GAME_MESSAGES = 'RECEIVE_GAME_MESSAGES';
export const RECEIVE_MESSAGE_ERRORS = "RECEIVE_MESSAGE_ERRORS";


// Dispatches ================================================================
//Not in USE!
export const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages: messages
});

export const receiveGameMessages = messages => ({
  type: RECEIVE_GAME_MESSAGES,
  messages: messages
});

export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message: message
});

export const receiveErrors = errors => ({
  type: RECEIVE_MESSAGE_ERRORS,
  errors: errors
})

// Dispatch Functions ========================================================
export const getGameMessages = gameId => dispatch => APICalls.getMessagesByGameId(gameId)
  .then(messages => dispatch(receiveGameMessages(messages)))
  .catch(err => console.log(err));

export const getMessage = _id => dispatch => APICalls.getOne(_id)
  .then(message => dispatch(receiveMessage(message)))

export const postMessage = messageDat => dispatch => APICalls.postMessage(messageDat)
  .then(
    message => dispatch(receiveMessage(message)),
    err => dispatch(receiveErrors(err.response.data))
  )