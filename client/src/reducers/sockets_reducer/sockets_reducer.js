import { combineReducers } from "redux";

import connection from "./connection_reducer";
import messages from "./message_reducer";
import watchers from "./watchers_reducer";

export default combineReducers({
  connection: connection,
  messages: messages,
  watchers: watchers
});