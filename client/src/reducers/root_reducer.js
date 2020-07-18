import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import games from "./games_reducer";

const RootReducer = combineReducers({
  session,
  games,
  errors
});

export default RootReducer;