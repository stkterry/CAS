import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
// import cx from "classnames";

import CardFront from "../card_anims/CardFront";
import CardBack from "../card_anims/CardBack";
import CardStackFront from "../card_anims/CardStackFront";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class CardFlip extends React.Component {

  state = {
    animNow: this.props.animNow || false,
    content: (this.props.content.length) ? this.props.content : ["...loading"],
    currentIdx: 0,
    currentContent: null,
    pastContent: null,
    started: true,
    renderStatic: false
  }

  interval = null;

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      this.setState({ 
        content: (this.props.content.length) ? this.props.content : ["...loading"], 
        currentIdx: 0 })
    }
  }
  
  componentDidMount() {
    this.switch();
    this.startLoop();
  }

  switch = () => {
    this.setState(prevState => ({
      animNow: !prevState.animNow
    }))
  }
  
  getCurrentContent = () => {
    let currentIdx = (this.state.currentIdx + 1) % this.state.content.length;
    this.setState({
      currentIdx: currentIdx,
      currentContent: this.state.content[currentIdx]
    })
  }

  startStop = () => {
    this.setState({
      started: !this.state.started
    })
    if (this.state.started) clearInterval(this.interval);
    else this.startLoop();
  }

  startLoop = () => {
    this.interval = setInterval(() => {
      this.switch();
    }, 2500)
  }

  placeHolder = () => {
    if (this.state.renderStatic) {
      let content = (<h5>{this.state.pastContent}</h5>)
      return (<CardBack content={content} />)
    }
  }

  setStatic = () => {
    this.setState({
      renderStatic: true,
      pastContent: this.state.currentContent
    })
  }

  render() {

    return (
      <div>
      <CardStackFront 
        className="card_flip-static_card"
        left={-10}
        top={-10}
        amt={5}
      />
      {this.placeHolder()}
      <CSSTransition 
        in={this.state.animNow}
        timeout={1000}
        classNames="card_flip-transition"
        unmountOnExit
        appear
        // onEntered={this.setStatic}
        onEnter={this.getCurrentContent}
        onExiting={this.setStatic}
        // onExit={this.getCurrentContent}
        // onExiting={this.static}
      >
        <div 
          className="card_flip-container"
          onClick={this.startStop}
        >
          <div className="card_flip-inner">
            <div className="card_flip-front">
              <h3>Crimes</h3>
              <h3>Against</h3>
              <h3>Stupidity</h3>
            </div>
            <div className="card_flip-back">
              <h5>{this.state.currentContent}</h5>
            </div>
          </div>

        </div>
      </CSSTransition>
      </div>
    )
  }
}

export default CardFlip;