import {
  WATCH_MESSAGES

} from "../../actions/socket_actions";

const initialState = {
  messages: { sent: null }
};


export default (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case WATCH_MESSAGES:
      return state;
    default:
      return state;
  }
}