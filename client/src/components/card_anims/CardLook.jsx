import React from "react";
import useFitText from "use-fit-text";

import Phase from "./Phase";

const WHITE = require("../../assets/images/125x188_white_4x.png");
const BLACK = require("../../assets/images/125x188_black_4x.png");

const condStyle = {
  off: { zIndex: 'auto' },
  on: { zIndex: '100' }
}

export default function CardLook (props) {

  const { fontSize, ref } = useFitText();

  let src, className, draw, pick;
  if (props.card.color === 'white') {
    src = WHITE;
    className = "card_look-white " + (props.className || "")
  } else {
    src = BLACK;
    className = "card_look-black " + (props.className || "")

    if (props.card.draw > 1 || props.card.pick > 1) {
      draw = 'Draw ' + props.card.draw;
      pick = 'Pick ' + props.card.pick;
    }
  }

  return (
    <Phase className={className} condStyle={condStyle} anim={props.anim || null}>
      <h5 ref={ref} style={{ fontSize }}>
        {props.card.content}
      </h5>
      <div>
        <h6>{draw}</h6>
        <h6>{pick}</h6>
      </div>
        <img alt="Card Backing" src={src} />
    </Phase>
  )
}