
import {
  CONNECT,
  CONNECT_SUCCESS,
  CONNECT_FAILURE,

  DISCONNECT
} from "../../actions/socket_actions";


const initialState = { connected: false };

export default (state = initialState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case CONNECT:
      console.log("Attempting to establish socket connection");
      return state;
    case CONNECT_SUCCESS:
      console.log("Connected")
      newState.connected = true;
      return newState;
    case CONNECT_FAILURE:
      newState.connected = false;
      console.log("Failed to connect websocket!")
      return newState;
    
    case DISCONNECT:
      newState.connected = false;
      console.log("Disconnecting from socket")
      return newState;

    default:
      return state;
  }
}
