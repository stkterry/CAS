import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { FontAwesomeIcon as Fai } from '@fortawesome/react-fontawesome'

export default function ErrorList (props) {

  const getCheck = bool => {
    if (bool == null) return
    else if (bool) return <Fai icon="check-circle" className="signup_check" />
    else return <Fai icon="times-circle" className="signup_times" />
  }

  const errors = props.errors;
  return (
    <TransitionGroup component="ul" className="error_list">
      {Object.keys(errors).map(error => (
        <CSSTransition
          timeout={1000}
          classNames="error_list"
          key={error}
          unmountOnExit
          appear
        >
          <li className="error_list-li">
            <h5>{error}{getCheck(errors[error])}</h5>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
};