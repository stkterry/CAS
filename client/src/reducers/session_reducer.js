import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN,
  RECEIVE_USER_EXISTS
} from "../actions/session_actions";

const initialState = {
  isAuthenticated: false,
  user: {},
  handleAvailable: true
};

export default (state = initialState, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      };
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      };
    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isSignedIn: true
      };
    case RECEIVE_USER_EXISTS:
      console.log('reducer', !action.users.data.exists)
      newState.handleAvailable = !action.users.data.exists;
      return newState;
    default:
      return state;
  }
};