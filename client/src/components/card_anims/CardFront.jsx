import React from "react";


export default class CardFront extends React.Component {
  render = () => (
    <div className={`flip-card ${this.props.className}`}>
      <div className="flip-card-front">
        <h3>Crimes</h3>
        <h3>Against</h3>
        <h3>Stupidity</h3>
      </div>
    </div>
  )
}