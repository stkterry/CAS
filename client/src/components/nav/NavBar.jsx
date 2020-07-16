import React from "react"
import { Link } from "react-router-dom";


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
        <h1>CAH</h1>
        <div>
          <Link to={'/profile'}>Profile</Link>
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      </div>
    );
  }
}

export default NavBar;