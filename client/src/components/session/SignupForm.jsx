import React from "react";
import { withRouter } from "react-router-dom";

import CardFlipHover from "../card_anims/CardFlipHover";
import CardFlip from "../card_anims/CardFlip";
import CardFront from "../card_anims/CardFront";
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

      cards: [],

      handleExists: false,
      currentErrors: {},
      prevErrors: {}
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.signedIn) {
      this.props.login({
        email: this.state.email,
        password: this.state.password
      })
    }
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }

    if (prevProps.cards !== this.props.cards) {
      this.setState({ cards: this.props.cards });
    }

    // Check the database for the user with the given handle...
    // if (prevState.handle !== this.state.handle) {
    //   this.setState({
    //     currentErrors: Object.assign({}, this.state.currentErrors, this.softCheckErrors('handle'))
    //   });
    // }

    // if (prevState.email !== this.state.email) {
    //   this.setState({
    //     currentErrors: Object.assign({}, this.state.currentErrors, this.softCheckErrors('email'))
    //   })
    // }

    // if (prevState.password !== this.state.password) {
    //   this.setState({
    //     currentErrors: Object.assign({}, this.state.currentErrors, this.softCheckErrors('password'))
    //   })
    // }

    // if (prevState.password2 !== this.state.password2) {
    //   this.setState({
    //     currentErrors: Object.assign({}, this.state.currentErrors, this.softCheckErrors(''))
    //   })
    // }

    // if (prevState.currentErrors != this.state.currentErrors) {
    //   if (Object.values(prevState.currentErrors) !== Object.values(this.state.currentErrors)) {
    //     console.log(Object.values(prevState.currentErrors), Object.values(this.state.currentErrors) )
    //   }
    //   this.setState({
    //     prevErrors: Object.assign({}, this.state.currentErrors)
    //   })
    // }

  }

  update = field => event => this.setState({
      [field]: event.currentTarget.value
  });

  // update = field => event => {
  //   this.setState({
  //     [field]: event.currentTarget.value
  //   })

  //   this.setState({
  //     currentErrors: Object.assign({}, this.state.currentErrors, this.softCheckErrors(field))
  //   })
  // }


  softCheckErrors = field => {
    switch(field) {
      case 'handle':
        return ValidAPI.softCheckHandle(this.state.handle, null);
      case 'email':
        return ValidAPI.softCheckEmail(this.state.email);
      default:
        return ValidAPI.softCheckPassword(this.state.password, this.state.password2);
    }
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

  renderErrors() {

    const errs = Object.values(this.state.errors).map(error => (<h5>{error}</h5>))
    return (
      <>
        <CardFront className="signup_form-static_card"/>
        <CardFlip content={errs} />
      </>
    )

    // return (
    //   <ul>
    //     {Object.keys(this.state.errors).map((error, i) => (
    //       <li key={`error-{i}`}>
    //         {this.state.errors[error]}
    //       </li>
    //     ))}
    //   </ul>
    // );
  }

  renderSoftErrors() {

    return (
      Object.keys(this.state.prevErrors).map((key, idx) => {
        // return <CardFlipHover className="signup_form-card" content={key}/>
        const content = this.state.currentErrors
        return <h6>{key} {`${this.state.currentErrors[key]}`}</h6>
      }
 
      )
    )
  }

  render() {
    return (
      <div className="signup-form-container">
        <div id="signup_form">
          <div id="signup_form-heading">
            <h3 className="signup_form-title_text">Crimes Against Stupidity</h3>
            <h4>&#8627; Create your account</h4>
          </div>
          <div id="signup_form-body">
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

            <div id="signup_form-errors_container">
              <div id="signup_form-errors">
                {this.renderErrors()}
                {/* <h6>SOME ERRORS HEREE check</h6>
                <h6>SOME ERRORS HEREE check</h6> */}
                {/* {this.renderSoftErrors()} */}
              </div>
            </div>
          </div>
          {/* <div id="signup_form-left"></div> */}
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);