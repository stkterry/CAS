import React from "react";
import Name from "../labels/Name";

export default function CardFlipHover (props) {

  return (
    <div className={`card_fh-container ${props.className}`}>
      <div className="card_fh-inner-black">
        <div className="card-front-black">
          <Name />
        </div>
        <div className="card_fh-back-black">
          <h5>{props.content}</h5>
        </div>
      </div>
    
    </div>
  )
}
