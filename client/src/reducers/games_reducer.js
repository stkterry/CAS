import merge from "lodash/merge";
import {
  RECEIVE_GAMES,
  RECEIVE_USER_GAMES,
  RECEIVE_NEW_GAME,
  RECEIVE_GAME,
  RECEIVE_ACTIVE_GAME
} from "../actions/game_actions";

const GamesReducer = (state = { all: {}, user: {}, new: undefined, active: {} }, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_GAMES:
      newState.all = action.games.data;
      return newState;
    case RECEIVE_GAME:
      newState.all = [action.game.data].concat(state.all);
      return newState;
    case RECEIVE_ACTIVE_GAME:
      newState.active = action.game.data;
      return newState;
    case RECEIVE_USER_GAMES:
      newState.user = action.games.data;
      return newState;
    case RECEIVE_NEW_GAME:
      newState.new = action.game.data;
      return newState;
    default:
      return state;
  }
};

export default GamesReducer;