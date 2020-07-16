import React from "react";
import { Link } from "react-router-dom";

class SplashNav extends React.Component {

  constructor(props) {
    super(props);
  }

  logoutUser = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  loggedOut() {
    return (
      <div id="splash-hero-log">
        <Link className="default-btn" to={'/signup'}>
          Signup
        </Link>
        <span>or</span>
        <Link className="default-btn" to={'/login'}>
          Login
        </Link>
        <span>to start a game!</span>
      </div>
    )
  }

  loggedIn() {
    return (
      <div id="splash-hero-log">
        <Link className="default-btn" to={"/signup"}>
          Signup
        </Link>
        <span>or</span>
        <Link className="default-btn" to={"/login"}>
          Login
        </Link>
        <span>to start a game!</span>
      </div>
    )
  }

  getLinks = () => {
    if (this.props.loggedIn) return this.loggedIn()
    else return this.loggedOut();
  }

  render() {
    return this.getLinks();
  }

}

export default SplashNav;