import jwt_decode from "jwt-decode";
import axios from "axios";

import { setAuthToken } from "../util/session_api_util";

// Axios ============================================================
const axios_signup = userData =>
  axios.post('/api/users/register', userData);

const axios_login = userData =>
  axios.post('/api/users/login', userData);

// Dispatch Labels ===========================================================
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";


// Dispatches ================================================================
// Dispatched on user sign in
export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser: currentUser
})

// Dispatched on redirect when login/signup
export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN
});

// Dispatched on errors received
export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors: errors
});

// Dispatched on user user logout
export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});


// Dispatch Functions ========================================================
// Dispatched on user sign up
export const signup = user => dispatch => axios_signup(user)
    .then(
      () => dispatch(receiveUserSignIn()),
      err => dispatch(receiveErrors(err.response.data))
    )

// Set session token and dispatch user on login
export const login = user => dispatch => axios_login(user)
    .then(
      res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded));
      }
    )
    .catch(err => dispatch(receiveErrors(err.response.data)))


export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(logoutUser());
};