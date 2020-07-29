import {
  RECEIVE_MESSAGE_ERRORS
} from "../actions/message_actions";

const _nullErrors = [];

const MessageErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_MESSAGE_ERRORS:
      return action.errors;
    
    default: 
      return state;
  }
};

export default MessageErrorsReducer;