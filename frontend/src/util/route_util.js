import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

// Passed in from parent component or from mSP (mapStateToProps)
const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route 
    path={path} 
    exact={exact} 
    render={props =>
      !loggedIn ? 
        (<Component {...props} />) : 
        (<Redirect to="/landing" />)
    } 
  />
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => 
      loggedIn ? 
        (<Component {...props} />) : 
        (<Redirect to="/" />)
    }
  />
);

const mSP = state => ({
  loggedIn: state.session.isAuthenticated
});

export const AuthRoute = withRouter(connect(mSP)(Auth));

export const ProtectedRoute = withRouter(connect(mSP)(Protected));