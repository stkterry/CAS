import React from "react";
import { withRouter } from "react-router-dom";
import _ from "lodash";

import CardFlip from "../card_anims/CardFlip";
import CardFront from "../card_anims/CardFront";
import ErrorList from "../errors/ErrorList";
import InputEntry from "./InputEntry";
import * as ValidAPI from "../../util/soft_validation";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      handle: "",
      password: "",
      password2: "",

      errors: {},
      checks: { email: false, handle: false, password: false},

      cards: [],
      handleExists: false,
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

  componentDidUpdate(prevProps) {
    if (this.props.signedIn) {
      this.props.login({
        email: this.state.email,
        password: this.state.password
      })
    }
    if (!_.isEqual(prevProps.errors,this.props.errors)) {
      this.setState({ 
        errors: this.props.errors
       });
    }

    if (prevProps.cards !== this.props.cards) {
      this.setState({ cards: this.props.cards });
    }
  }

  update = field => event => {
    if (field === "handle" && event.currentTarget.value) this.props.checkForUserByHandle(event.currentTarget.value)
    this.setState({
      [field]: event.currentTarget.value,
    }, 
    () => this.softCheckErrors(field))
  }


  softCheckErrors = field => {
    if (field === 'handle') this.setState(prevProps => ({
      handleExists: this.props.handleExists
    }))
    const errors = (() => {
      switch (field) {
        case 'handle':
          return ValidAPI.softCheckHandle(this.state.handle, this.state.handleExists);
        case 'email':
          return ValidAPI.softCheckEmail(this.state.email);
        default:
          return ValidAPI.softCheckPassword(this.state.password, this.state.password2);
      }
    })();

    this.setState({
      errors: errors
    },
    () => {
      let checked = true;
      Object.values(this.state.errors).forEach(err => {if (!err) checked = false})
      console.log(checked)
      this.setState({
        checks: Object.assign(this.state.checks, {[field]: checked })
      })
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    let user = {
      email: this.state.email,
      handle: this.state.handle,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user);
  }

  renderCards() {
    if (this.state.cards.length) {
      return (<CardFlip content={this.state.cards.map(card => card.content)} />)
    }
  }

  render() {
    return (
      <div id="signup_form-container">
        <div id="signup_form">
          <div id="signup_form-heading">
            <h3 className="signup_form-title_text">Crimes Against Stupidity</h3>
            <h4>&#8627; Create your account</h4>
          </div>
          <div id="signup_form-body">
            <div id="signup_form-left">
              <form onSubmit={this.handleSubmit}>
                <br />
                <InputEntry
                  type="text"
                  className="inputEntry"
                  value={this.state.handle}
                  onChange={this.update('handle')}
                  placeholder="Handle"
                />
                <InputEntry
                  type="text"
                  className="inputEntry"
                  value={this.state.email}
                  onChange={this.update('email')}
                  placeholder="Email"
                />
                <InputEntry
                  type="text"
                  className="inputEntry"
                  value={this.state.password}
                  onChange={this.update('password')}
                  placeholder="Password"
                />
                <InputEntry
                  value={this.state.password2}
                  onChange={this.update('password2')}
                  className="inputEntry"
                  placeholder="test"
                  type="text"
                  placeholder="Confirm Password"
                />
                <br />
                <button className="btn-ghost" onClick={this.handleSubmit}>Create Account</button>
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

export default withRouter(SignupForm);