import React from "react";
const BLACK_125X188 = require("../../assets/images/125x188_black_4x.png");


export default class CardFront extends React.Component {
  render = () => (
    <div className={`card_front-container ${this.props.className}`}>
      <div className="card_front-front">
        <h3>Crimes</h3>
        <h3>Against</h3>
        <h3>Stupidity</h3>
      </div>
      <div className="card-inner"/>
      {/* <img src={BLACK_125X188} /> */}
    </div>
  )
}