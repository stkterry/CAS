import React from 'react';
import { withRouter } from "react-router-dom";

import InputEntry from "./InputEntry";
import ErrorList from "../errors/ErrorList";
import CardFront from "../card_anims/CardFront";
import CardFlip from "../card_anims/CardFlip";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
      cards: []
    };

  }

  componentDidMount() {
    if (!this.props.location.state) {
      this.props.getNRandColorCards(41, 'black');
    } else if (!this.props.location.state.cards.length) {
      this.props.getNRandColorCards(41, 'black');
    } else {
      this.setState({ cards: this.props.location.state.cards })
    }
  }

  componentDidUpdate(prevProps, nextProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors })
    }
  }

  update(field) {
    return event => this.setState({
      [field]: event.currentTarget.value
    });
  }

  renderCards() {
    if (this.state.cards.length) {
      return (<CardFlip content={this.state.cards.map(card => card.content)} />)
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user)
  }

  render() {
    return (
      <div id="signup_form-container">
        <div id="signup_form">
          <div id="signup_form-heading">
            <h3 className="signup_form-title_text">Crimes Against Stupidity</h3>
            <h4>&#8627; Sign in to your account</h4>
          </div>
          <div id="signup_form-body">
            <div id="signup_form-left">
              <form onSubmit={this.handleSubmit}>
                <br />
                <InputEntry 
                  type="text"
                  className="inputEntry"
                  value={this.state.email}
                  onChange={this.update('email')}
                  placeholder="Email"
                />
                <InputEntry 
                  type="password"
                  className="inputEntry"
                  value={this.state.password}
                  onChange={this.update('password')}
                  placeholder="Password"
                />
                <br />
                <div id="signup_form-buttons">
                  <button className="btn-ghost" onClick={this.handleSubmit}>Login</button>
                  {/* <button className="btn-ghost" onClick={this.handleSubmit}>Already Registered?</button> */}
                </div>
              </form>

              <div id="signup_form-errors">
                <ErrorList errors={this.state.errors} />
              </div>
            </div>
            <div id="signup_form-right">
              <div id="signup_form-card_flip">
                <CardFront className="signup_form-static_card" />
                {this.renderCards()}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);