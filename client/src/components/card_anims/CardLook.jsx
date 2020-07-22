import React from "react";

import Phase from "./Phase";

const FitText = require("react-fittext");
const WHITE_125X188 = require("../../assets/images/125x188_white_4x.png");
const BLACK_125X188 = require("../../assets/images/125x188_black_4x.png");

class CardLook extends React.Component {

  constructor(props) {
    super(props);

    this.condStyle = {
      off: {
        zIndex: 'auto',
        // background: 'none'
      },
      on: {
        zIndex: '100'
      }
    }
  }

  render () {
    let { _id, content } = this.props.card;
    let src, className, draw, pick;
    let addedClasses = this.props.className ? this.props.className : "";
    
    if (this.props.card.color === 'white') {
      src = WHITE_125X188;
      className = "card_look-container_white " + addedClasses
    } else {
      src = BLACK_125X188;
      className = "card_look-container_black " + addedClasses

      if (this.props.card.draw > 0 || this.props.card.pick > 0) {
        draw = 'Draw ' + this.props.card.draw;
        pick = 'Pick ' + this.props.card.pick;
      }
    }
    
    return (
      <Phase className={className} condStyle={this.condStyle} >
        {/* <div className="card_look-sheen"></div> */}

          <h5>{content}</h5>
          {/* <FitText >
          </FitText> */}
        
        {/* <h5 className="card_look-pack"></h5> */}
        <div className='card_look-draw_count'>
          <h6>{draw}</h6>
          <h6>{pick}</h6>
        </div>
        <img src={src}/>
        {/* <div className="card_look-bottom"></div> */}
      </Phase>
    )
  }
}

export default CardLook;