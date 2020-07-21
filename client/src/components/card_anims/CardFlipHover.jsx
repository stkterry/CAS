import React from "react";
const BLACK_125X188 = require("../../assets/images/125x188_black_4x.png");

class CardFlipHover extends React.Component {

  render() {
    return (
      <div className={`card_flip_hover-container ${this.props.className}`}>
        <div className="card_flip_hover-inner">
          <div className="card_flip_hover-front">
            <h3>Crimes</h3>
            <h3>Against</h3>
            <h3>Stupidity</h3>
          </div>
          
          {/* <img src={BLACK_125X188} /> */}
          <div className="card_flip_hover-back">
            <h5>{this.props.content}</h5>
          </div>
            {/* <img src={BLACK_125X188} /> */}
        </div>
      
      </div>
    )
  }
}

export default CardFlipHover;