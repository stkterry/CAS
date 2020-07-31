import React from "react";
import Name from "../labels/Name";

export default function Card(props) {

  // const container = `card-container card-abs-sep ${props.className}`;
  // const className = `card-${props.face}-${props.color}`;
  // const content = props.content || (<Name />);
  return (
    <div className={`card-container card-abs-sep ${props.className}`}>
      <div className={`card-${props.face}-${props.color}`}>
        {props.content || (<Name />)}
      </div>
    </div>
  )
}