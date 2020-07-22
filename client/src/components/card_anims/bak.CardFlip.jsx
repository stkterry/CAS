import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
// import cx from "classnames";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class CardFlip extends React.Component {

  state = {
    animNow: this.props.animNow || false,
    content: this.props.content
  }

  switch = () => {
    this.setState(prevState => ({
      animNow: !prevState.animNow
    }))
  }

  componentDidMount() {
    this.setState({
      content: this.props.content
    })
  }

  componentDidUpdate(prevProps, prevState) {

    if (!_.isEqual(prevState.content, this.props.content) && !this.state.animNow) {
      this.setState({
        content: this.props.content,
        animNow: true
      })
    }

    if (prevProps.animNow !== this.props.animNow) {
      console.log('update')
      this.update();
    }

  }

  render() {
    const { animFinished, classNames } = this.state;

    return (
      <div>
        <button className="TEMP" onClick={this.switch}>BUTTON</button>

      <CSSTransition 
        in={this.state.animNow}
        timeout={1000}
        classNames="card_flip-transition"
        unmountOnExit
        appear
        onExiting={this.static}
      >
        <div 
          className="card_flip-container"
        >
          <div className="card_flip-inner">
            <div className="card_flip-front">
              <h3>Crimes</h3>
              <h3>Against</h3>
              <h3>Stupidity</h3>
            </div>
            <div className="card_flip-back">
              {this.props.content}
            </div>
          </div>

        </div>
      </CSSTransition>
      </div>
    )
  }
}

export default CardFlip;