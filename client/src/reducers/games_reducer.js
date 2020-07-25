import {
  RECEIVE_GAMES,
  RECEIVE_USER_GAMES,
  RECEIVE_NEW_GAME,
  RECEIVE_GAME,
  RECEIVE_ACTIVE_GAME,
  RECEIVE_PLAYER_STATE
} from "../actions/game_actions";

const initialState = { 
  all: {}, 
  user: {}, 
  new: undefined, 
  active: {},
  playerState: {}
}

const GamesReducer = (state = initialState, action) => {
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
    case RECEIVE_PLAYER_STATE:
      newState.playerState = action.playerState.data;
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