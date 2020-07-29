import React from "react";
import { FontAwesomeIcon as Fai } from '@fortawesome/react-fontawesome';

export default function ImgButton(props) {

  return (
    <div className="tooltip">
      <button className="btn-icon"
        onClick={props.onClick}
      >
        <div className="btn-img-shadow" />
        <Fai icon={props.icon} className="" />
        <span className="tooltiptext">{props.tooltipText}</span>
      </button>
    </div>
  )
}