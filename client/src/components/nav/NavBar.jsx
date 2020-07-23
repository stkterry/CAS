import React from "react"
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { getPhrase } from "../../util/util";



class NavBar extends React.Component {

  state = {
    animNow: this.props.animNow || false,
    phrase: getPhrase()
  }

  switch = () => {
    this.setState({
      animNow: !this.state.animNow
    })
  }

  navActive = () => {
    this.setState({
      animNow: true
    })
  }

  navInactive = () => {
    this.setState({
      animNow: false
    })
  }

  logoutUser = event => {
    event.preventDefault();
    this.props.logout();
  }

  newPhrase = () => this.setState({ phrase: getPhrase() })

  render() {
    return (

      <div 
        id="nav_bar-container" 
        className={this.state.className} 
        onMouseEnter={this.navActive} 
        onMouseLeave={this.navInactive}
      >
        <i className="fas fa-caret-down nav_bar-carats"></i>
        <CSSTransition
          in={this.state.animNow}
          timeout={500}
          classNames="nav_bar"
          unmountOnExit
          appear
          onExited={this.newPhrase}

        >
          <div id="nav_bar" onMouseLeave={this.navInactive}>
            <div id="nav_bar-left">
              <h1 className="title-text">Crimes Against Stupidity</h1>
              <h2 className="secondary-text">&#8627; {this.state.phrase}</h2>
            </div>
            <div>
              <Link to={'/profile'}>Profile</Link>
              <button onClick={this.logoutUser}>Logout</button>
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default NavBar;