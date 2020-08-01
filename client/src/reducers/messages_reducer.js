import {
  RECEIVE_GAME_MESSAGES,
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGES,
} from "../actions/message_actions";


const initialState = {
  all: [],
  user: [],
  new: {user: {}},
  active: [],
}

export default (state = initialState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_GAME_MESSAGES:
      newState.active = action.messages.data;
      return newState;
    case RECEIVE_MESSAGE:
      newState.new = action.message || {user: {}};
      newState.active.push(action.message);
      return newState;
    case RECEIVE_MESSAGES: 
      newState.all = action.messages.data;
      return newState;
    default:
      return state;
  }
};