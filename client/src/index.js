import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from "jwt-decode";

import Root from "./components/root";
import configureStore from "./store/store";
import { setAuthToken } from "./util/session_api_util";
import { logout } from "./actions/session_actions";

import "./assets/stylesheets/App.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, fas } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faCrown } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee, faCrown)

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
