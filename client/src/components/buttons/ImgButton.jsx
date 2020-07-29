import React from "react";


export default function ImgButton (props) {

  return (
    <div className="tooltip">
      <button className="btn-img" 
        onClick={props.onClick}
      >
        <div className="btn-img-shadow" />
        <img src={props.src}/>
        <span className="tooltiptext">{props.tooltipText}</span>
      </button>
    </div> 
  )
}