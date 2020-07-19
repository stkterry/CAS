import React from "react";
import { Textfit } from "react-textfit";

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
    // content = content.split().map(char => {return char == '_' ? '&#9089;' : char}).join('');
    let src, className, draw, pick;
    if (this.props.card.color === 'white') {
      src = WHITE_125X188;
      className = "card_look-container_white"
    } else {
      src = BLACK_125X188;
      className = "card_look-container_black"

      if (this.props.card.draw < 1 || this.props.card.pick < 1) {
        draw = 'Draw ' + this.props.card.draw;
        pick = 'Pick ' + this.props.card.pick;
      }
    }
    
    return (
      <Phase class={className} condStyle={this.condStyle}>
        {/* <div className="card_look-sheen"></div> */}

        <FitText minFontSize={10} maxFontSize={13} compressor={0.5}>
            <h5>{content}</h5>
        </FitText>

        <div className='card_look-draw_count'>
          <h6>{draw}</h6>
          <h6>{pick}</h6>
        </div>
        <img src={src} className="card_look-bottom" />
        {/* <div className="card_look-bottom"></div> */}
      </Phase>
    )
  }
}

export default CardLook;