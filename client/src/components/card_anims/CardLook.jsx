import React from "react";

import Phase from "./Phase";

const WHITE = require("../../assets/images/125x188_white_4x.png");
const BLACK = require("../../assets/images/125x188_black_4x.png");


const condStyle = {
  off: { zIndex: 'auto' },
  on: { zIndex: '100' }
}

export default function CardLook (props) {

  let src, className, draw, pick;
  if (props.card.color === 'white') {
    src = WHITE;
    className = "card_look-white " + (props.className || "")
  } else {
    src = BLACK;
    className = "card_look-black " + (props.className || "")

    if (props.card.draw > 0 || props.card.pick > 0) {
      draw = 'Draw ' + props.card.draw;
      pick = 'Pick ' + props.card.pick;
    }
  }


  return (
    <Phase className={className} condStyle={condStyle} anim={props.anim || null}>
        <h5>{props.card.content}</h5>
        {/* <div className='card_look-draw_count'>
          <h6>{draw}</h6>
          <h6>{pick}</h6>
        </div> */}
        <img src={src} />
    </Phase>
  )
}