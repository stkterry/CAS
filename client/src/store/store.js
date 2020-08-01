import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import socketMiddleware from "../sockets/socketMiddleware";

import rootReducer from "../reducers/root_reducer";

const configureStore = (preloadedState = {}, socketClient) => (
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, logger, socketMiddleware(socketClient))
  )
);

export default configureStore;