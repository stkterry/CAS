import React, { useState } from "react";

const ACTIVE = { opacity: '1' };
const DEFAULT = { opacity: '0' };
const STYLE = { 
  pointerEvents: 'none',
  position: 'absolute',
  top: '0rem',
  lineHeight: 'normal',
  fontSize: '1.2rem',
  left: '1rem',
  padding: "0rem .5rem",
  opacity: '0',
  transition: 'all 0.2s ease-in-out'
}

export default function InputEntry (props) {

  const activeStyle = (props.activeStyle || ACTIVE);
  const defaultStyle = (props.defaultStyle || DEFAULT);
  const [style, setStyle] = useState(props.hStyle || STYLE);
  const [placeholder, setPlaceHolder] = useState(props.placeholder);

  const onFocus = () => {
    setStyle(Object.assign({}, style, activeStyle));
    setPlaceHolder("");
    if (props.onFocus) props.onFocus();
  }
  
  const onDefocus = () => {
    if (!props.value) {
      setStyle(Object.assign({}, style, defaultStyle));
      setPlaceHolder(props.placeholder);
    }
    if (props.onBlur) props.onBlur();
  }

  return (
    <div style={{position: "relative"}} className={props.className}>
      <h4 style={style} className="no-select">{props.placeholder}</h4>
      <input
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        ref={props.refLink}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onDefocus}
      />
    </div>
  )

}