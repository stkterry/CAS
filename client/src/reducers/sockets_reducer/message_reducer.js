import {
  SEND_MESSAGE,
  SEND_SUCCESS,

} from "../../actions/socket_actions";

const initialState = {
  messages: { sent: null }
};


export default (state = initialState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch(action.type) {
    case SEND_MESSAGE:
      return newState;
    case SEND_SUCCESS:
      return state;
    default:
      return state;
  }
}