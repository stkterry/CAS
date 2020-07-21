import React from "react";
import { Link, withRouter } from "react-router-dom";

class SplashNav extends React.Component {

  render() {
    if (this.props.loggedIn) this.props.history.push("/landing");

    return (
      <div id="splash-hero-log">
        <Link className="btn-ghost" to={"/signup"}>
          Signup
        </Link>
        <span>or</span>
        <Link className="btn-ghost" to={"/login"}>
          Login
        </Link>
        <span>to start a game!</span>
      </div>
    )
  }

}

export default withRouter(SplashNav);