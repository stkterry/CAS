import jwt_decode from "jwt-decode";
import axios from "axios";

import { setAuthToken } from "../util/session_api_util";


export const receiveUserExists = exists => ({
  type: RECEIVE_USER_EXISTS,
  users: exists
});


// Axios ============================================================

export const APICalls = {
  signup: userDat => axios.post("/api/users/register", userDat),
  login: userDat => axios.post("/api/users/login", userDat),
  checkForUserByHandle: handle => axios.get(`/api/users/checkhandle/${handle}`)
}

// Dispatch Labels ===========================================================
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_EXISTS = "RECEIVE_USER_EXISTS";


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
export const signup = user => dispatch => APICalls.signup(user)
  .then(
    () => dispatch(receiveUserSignIn()),
    err => dispatch(receiveErrors(err.response.data))
  )

// Set session token and dispatch user on login
export const login = user => dispatch => APICalls.login(user)
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

export const checkForUserByHandle = handle => dispatch => APICalls.checkForUserByHandle(handle)
  .then(exists => dispatch(receiveUserExists(exists)))
  .catch(err => console.log(err));