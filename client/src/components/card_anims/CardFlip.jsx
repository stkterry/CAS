import React from "react";
import _ from "lodash";

import Name from "../labels/Name";
import CardStack from "../card_anims/CardStack";
import Card from "../card_anims/Card";
import { CSSTransition } from "react-transition-group";

class CardFlip extends React.Component {

  state = {
    animNow: this.props.animNow || false,
    content: (this.props.content.length) ? this.props.content : ["...loading"],
    currentIdx: 0,
    currentContent: null,
    pastContent: <h6>...loading</h6>,
    started: true,
    renderStatic: false, 
    count: 0
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
      return (<Card color="black" face="back" content={content} />)
    }
  }

  setStatic = () => {
    this.setState({
      renderStatic: true,
      pastContent: <h5>{this.state.currentContent}</h5>,
      prevCard: <Card 
        color="black" 
        face="back" 
        content={<h5>{this.state.currentContent}</h5>}   
      />
    })
    console.log(this.state.count)
  }

  render() {

    return (
      <>
      <CardStack 
        className="card_flip-static_card"
        left={-5}
        top={-5}
        amt={5}
        color='black'
        face="front"
      />
      <CardStack
        className="card-abs-sep"
        left={-5}
        top={-5}
        amt={5}
        color='black'
        face="back"
        content={this.state.pastContent}
      />
      {/* {this.state.prevCard} */}
      <CSSTransition 
        in={this.state.animNow}
        timeout={1000}
        classNames="card-container-transition"
        unmountOnExit
        appear
        onEnter={this.getCurrentContent}
        onExiting={this.setStatic}
      >
        <div 
          className="card-container card-abs-sep"
          onClick={this.startStop}
        >
          <div className="card-inner-black">
            <div className="card-front-black">
              <Name />
            </div>
            <div className="card-back-black card-back-rot">
              <h5>{this.state.currentContent}</h5>
            </div>
          </div>

        </div>
      </CSSTransition>
      </>
    )
  }
}

export default CardFlip;