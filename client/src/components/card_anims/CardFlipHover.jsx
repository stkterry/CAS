import React from "react";

class CardFlipHover extends React.Component {

  render() {
    return (
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <h1>Crimes</h1>
            <h1>Against</h1>
            <h1>Stupidity</h1>
          </div>
          <div className="flip-card-back">
            <p>Do not fuck with me! I am literally _____ right now.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default CardFlipHover;