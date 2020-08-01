import { combineReducers } from "redux";

import connection from "./connection_reducer";
import messages from "./message_reducer";

export default combineReducers({
  connection: connection,
  messages: messages
});