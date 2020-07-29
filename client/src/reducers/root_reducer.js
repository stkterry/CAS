import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import games from "./games_reducer";
import cards from "./cards_reducer";
import messages from "./messages_reducer";

const RootReducer = combineReducers({
  session,
  games,
  errors,
  cards,
  messages
});

export default RootReducer;