import React from "react";
const BLACK_125X188 = require("../../assets/images/125x188_black_4x.png");

class CardFlip extends React.Component {

  state = {
    classNames: "",
    animFinished: false,
    animNow: this.props.animNow || false,
    content: this.props.content
  }

  anim = () => {
    const { classNames } = this.state;
    this.setState({
      classNames: classNames ? "" : "card_flip-anim",
      animNow: false
    });
  }

  onAnimStart = () => {
    this.setState({
      animFinished: false
    })
  }

  onAnimEnd = () => {
    this.setState({
      animFinished: true
    })
  }

  componentDidMount() {
    this.setState({
      content: this.props.content
    })
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.content !== this.props.content && this.props.content.length) {
    //   this.setState({
    //     content: this.props.content
    //   })
    // }

    // if (prevState.anim !== this.state.anim) {
    //   this.anim();
    //   this.setState({
    //     animNow: true
    //   })
    // }

    if (this.state.content !== this.props.content && this.props.content.length) {
      this.setState({
        content: this.props.content,
        animNow: true
      })

    }

    if (prevState.animNow !== this.state.animNow && this.state.animNow) {
      this.anim();
    }
  }

  shouldComponentUpdate(prevProps, prevState) {
    return (prevState.content !== this.props.content)
  }

  render() {
    const { animFinished, classNames } = this.state;

    return (
      <div 
        className={`card_flip-container ${classNames}`}
        onAnimationEnd={this.onAnimEnd}
        onAnimationStart={this.onAnimStart}
        // onUpdate={this.anim}
        // onClick={this.anim}
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
    )
  }
}

export default CardFlip;