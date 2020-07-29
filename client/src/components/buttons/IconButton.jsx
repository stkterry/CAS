import React from "react";


export default function IconButton (props) {

  return (
    <div class="tooltip">
      <button className="btn-featureButton" 
        onClick={props.onClick}
      >
        {/* <i src={props.icon} /> */}
        <img src={props.src} />
        <span class="tooltiptext">{props.tooltipText}</span>
      </button>
    </div> 
  )
}