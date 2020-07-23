import React from "react"
import { Link } from "react-router-dom";

import { getPhrase } from "../../util/util";



class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  logoutUser = event => {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <div id="nav_bar">
        <div id="nav_bar-left">
          <h1 className="title-text">Crimes Against Stupidity</h1>
          <h2 className="secondary-text">&#8627; {getPhrase()}</h2>
        </div>
        <div>
          <Link to={'/profile'}>Profile</Link>
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      </div>
    );
  }
}

export default NavBar;