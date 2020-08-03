import React from "react";

export default function CardStack (props) {


  const style = {
    left: props.left || 0,
    top: props.top || 0,
    amt: props.amt || 1,
    style: [],
    face: props.face || "front",
    color: props.color || 'black',
    genClassName: `card-${props.face}-${props.color}`
  }

  const genStyle = () => {
    let newStyle = [];
    const leftM = Math.max(style.left / (style.amt - 1), -Infinity);
    const topM = Math.max(style.top / (style.amt - 1), -Infinity);
    for (let i = style.amt; 0 <= i; i--) {
      newStyle.push({
        left: String(-leftM * i) + 'px',
        top: String(-topM * i) + 'px',
      })
    }
    style.style = newStyle;
  }

  const genContent = () => {
    if (props.content) return props.content
    else return (
      <>
        <h3>Crimes</h3>
        <h3>Against</h3>
        <h3>Stupidity</h3>
      </>
    )
  }
  const renderStack = () => (
    style.style.map((generatedStyle, idx) => (
      <div 
        key={idx}
        style={generatedStyle}
        className={style.genClassName  + " card-abs"}
      />
    ))
  )

  genStyle();
  return (
    <div className={`card-container card-shadow-stack ${props.className}`}>
      {renderStack()}
      <div
        key={style.amt}
        style={style.style[style.amt]}
        className={style.genClassName + "card-abs"}
      />
      <div className={style.genClassName }>
        {genContent()}
      </div>
    </div>
  )





}