import React from "react";


export default class CardBack extends React.Component {
  render = () => (
    <div className={`card_back-container ${this.props.className}`}>
      <div className="card_back-inner"> 
        <div className="card_back-back">
          {this.props.content}
        </div>
      </div>
    </div>
  )
}