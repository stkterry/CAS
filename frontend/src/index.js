import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from "jwt-decode";

import './index.css';

import Root from "./components/Root";
import configureStore from "./store/store";
import { setAuthToken } from "./util/session_api_util";
import { logout } from "./actions/session_actions";

document.addEventListener('DOMContentLoaded', () => {
  let store;

  // Check if user has a login token already
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);

    const decodeUser = jwt_decode(localStorage.jwtToken)
    const preloadedState = { session: { isAuthenticated: true, user: decodeUser } };

    store = configureStore(preloadedState);

    // Check if existing user token is expired
    if (decodeUser.exp < Date.now() / 1000) {
      store.dispatch(logout());
      window.location.href = "/login";
    }
  } else store = configureStore({})

  const root = document.getElementById('root');

  
  ReactDOM.render(<Root store={store} />, root);
})
