import React from "react";
import useFitText from "use-fit-text";

import Phase from "./Phase";
import useClickPrevention from "../../util/useClickPrevention";

const WHITE = require("../../assets/images/125x188_white_4x.png");
const BLACK = require("../../assets/images/125x188_black_4x.png");

const condStyle = {
  off: { zIndex: 'auto' },
  on: { zIndex: '100' }
}
export default function CardLook({className, draw, pick, color, content, onClick, onDoubleClick}) {
  const { fontSize, ref } = useFitText();

  let src;
  if (color === 'white') {
    src = WHITE;
    className = "card_look-white " + (className || "");
  } else {
    src = BLACK;
    className = "card_look-black " + (className || "");

    [draw, pick] = (draw > 1 || pick > 1) ? 
      ['Draw ' + draw, 'Pick ' + pick] : 
      ["", ""];
  }

  const [onClickP, onDoubleClickP] = useClickPrevention(
    onClick || (() => { }),
    onDoubleClick || onClick || (() => { }),
    200
  )

  return (
    <Phase
      onClick={onClickP}
      onDoubleClick={onDoubleClickP}
      className={className}
      condStyle={condStyle}
    >
      <h5 ref={ref} style={{ fontSize }}>
        {content}
      </h5>
      <div>
        <h6>{draw}</h6>
        <h6>{pick}</h6>
      </div>
      <img alt="Card Backing" src={src} />
    </Phase>
  )
}