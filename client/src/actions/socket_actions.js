import {
  receiveMessage
} from "./message_actions";

import {
  receiveCardInPlay
} from "./game_actions";

// Dispatch Labels =================================================
export const SET_USERID = "SET_USERID";

export const SOCKET = "SOCKET";
export const SUCCESS = "SUCCESS"

export const SEND_MESSAGE = "SEND_MESSAGE";
export const SEND_SUCCESS = "SEND_SUCCESS";
export const SEND_FAILURE = "SEND_FAILURE";

export const CONNECT = "CONNECT";
export const CONNECT_SUCCESS = "CONNECT_SUCCESS";
export const CONNECT_FAILURE = "CONNECT_FAILURE";

export const DISCONNECT = "DISCONNECT";

export const WATCH_MESSAGES = "WATCH_MESSAGES";

export const WATCH_CARDS_IN_PLAY = "WATCH_CARDS_IN_PLAY";
export const UPDATE_CARDS_IN_PLAY = "UPDATE_CARDS_IN_PLAY";


// Dispatch Functions ===============================================
export const setUserId = userId => ({
  type: SOCKET,
  types: [SET_USERID, null, null],
  promise: socket => socket.setUserId(userId)
})

export const connectSocket = opts => ({
  type: SOCKET,
  types: [CONNECT, CONNECT_SUCCESS, CONNECT_FAILURE],
  promise: socket => socket.connect(opts)
});

export const disconnectSocket = () => ({
  type: SOCKET,
  types: [DISCONNECT, null, null],
  promise: socket => socket.disconnect()
});

export const sendMessage = message => ({
  type: SOCKET,
  types: [SEND_MESSAGE, SEND_SUCCESS, SEND_FAILURE],
  promise: socket => socket.emit('sendMessage', {message: message})
});

export const watchMessages = dispatch => ({
  type: SOCKET,
  types: [WATCH_MESSAGES, null, null],
  promise: client => client.on("receiveMessage", message => dispatch(receiveMessage(message)))
});

export const updateCardsInPlay = card => ({
  type: SOCKET,
  types: [UPDATE_CARDS_IN_PLAY, null, null],
  promise: socket => socket.emit("updateCardsInPlay", {card: card})
})

export const watchCardsInPlay = dispatch => ({
  type: SOCKET,
  types: [WATCH_CARDS_IN_PLAY, null, null],
  promise: client => client.on("receiveCardInPlay", card => dispatch(receiveCardInPlay(card)))
})