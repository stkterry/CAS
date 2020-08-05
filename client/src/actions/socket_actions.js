import {
  receiveMessage
} from "./message_actions";

// Dispatch Labels =================================================
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

// Dispatch Functions ===============================================
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