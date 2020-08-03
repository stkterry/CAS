import React from "react";
import { Link, withRouter } from "react-router-dom";

import CardFlipHover from "../card_anims/CardFlipHover";
import Phase from "../card_anims/Phase";

const BLACK_125X188 = require("../../assets/images/125x188_black_4x.png");
class Splash extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      cards: (this.props.cards.length) ? this.props.cards : [],
      numCards: 41
    }
  }

  componentDidMount() {
    if (!this.state.cards.length) 
      this.props.getNRandColorCards(this.state.numCards, 'black');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cards !== this.props.cards) {
      this.setState({ cards: this.props.cards })
    }
  }

  getNav = () => {
    if (this.props.loggedIn) this.props.history.push("/landing");

    const loginState = {
      pathname: '/login',
      state: { cards: this.state.cards }
    };

    const signupState = {
      pathname: '/signup',
      state: { cards: this.state.cards }
    };

    return (
      <div id="splash-hero-log">
        <Link className="btn-ghost" to={signupState}>
          Signup
        </Link>
        <span>or</span>
        <Link className="btn-ghost" to={loginState}>
          Login
        </Link>
        <span>to start a game!</span>
      </div>
    )
  }

  getFlips = () => {
    if (this.state.cards.length) {
      return this.state.cards.map((card, idx) => 
        <Phase 
          key={card._id} 
          className={"splash-grid_card fade-in"} 
          condStyle={{off:{zIndex:'auto'}, on:{zIndex:'100'}}}
          options={{scale: '1.2'}}
          >
            <CardFlipHover content={card.content}/>
        </Phase>
      )
    } else {
      return Array.from(
        { length: this.state.numCards }, 
        (_, idx) => <div key={idx} className="empty_card splash-grid_card" />
      )
    }
  }

  render() {
    return (
      <div id="splash-main-adv">
        <div id="splash-hero-main-adv" className="splash_grid">
          <div id="splash-hero">
            <div id="splash-hero-tagline">
              <h1>Leave Humanity Behind</h1>
              <p>An online Cards Against Humanity game</p>
            </div>
            {this.getNav()}
          </div>
        </div>
        {this.getFlips()}
      </div>
    )
  }
}

export default withRouter(Splash);