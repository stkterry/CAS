import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import _ from "lodash";


export default class ErrorList extends React.Component {

  state = {
    animNow: this.props.animNow || true
  }

  switch = () => {
    this.setState(prevState => ({
      animNow: !prevState.animNow
    }))
  }

  getCheck = (error, bool) => {
    if (bool == null) return
    else if (bool) return <i className="fas fa-check-circle signup_check"></i>
    else return <i className="fas fa-times-circle signup_times"></i>
  }

  componentDidUpdate(prevProps, prevState) {
    // if (!_.isEqual(this.state.errors, this.props.errors)) {
    //   this.setState({
    //     errors: this.props.errors
    //   })
    //   this.switch();
    // }

  }

  render() {
    const errors = this.props.errors;
    return (
      <TransitionGroup component="ul" className="error_list">
        {Object.keys(errors).map(error => (
          <CSSTransition
            in={this.state.animNow}
            timeout={500}
            classNames="error_list"
            key={error}
            unmountOnExit
            appear
          >
            <li className="error_list-li">
              <h5>{error}{this.getCheck(error, errors[error])}</h5>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    )
  }

};