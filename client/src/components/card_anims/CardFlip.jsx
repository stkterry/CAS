import React from "react";
const BLACK_125X188 = require("../../assets/images/125x188_black_4x.png");

class CardFlip extends React.Component {

  state = {
    classNames: "",
    animationFinished: false,
  }

  anim = () => {
    const { classNames } = this.state;
    this.setState({
      classNames: classNames ? "" : "card"
    })
  }


  render() {
    return (
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <h3>Crimes</h3>
            <h3>Against</h3>
            <h3>Stupidity</h3>
          </div>

          {/* <img src={BLACK_125X188} /> */}
          <div className="flip-card-back">
            {this.props.content}
            {/* <img src={BLACK_125X188} /> */}
          </div>
        </div>

      </div>
    )
  }
}

export default CardFlip;