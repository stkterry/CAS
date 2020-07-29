import React, {useState, useEffect } from "react";
import { findDomNode } from "react-dom";

const defaultSettings = {
  reverse: false,
  max: 35,
  perspective: 1000,
  easing: 'cubic-bezier(.03,.98,.52,.99)',
  scale: '1.1',
  speed: '1000',
  transition: true,
  axis: 'null',
  reset: true
};

export default function Phase (props) {
  const elementRef = React.useRef(null);
  let element;
  let width = null;
  let height = null;
  let left = null;
  let top = null;
  let transitionTimeout = null;
  let updateCall = null;
  const settings = {
    ...defaultSettings,
    ...props.options,
    ...props.condStyle
  };
  settings.defTransition = `${settings.speed}ms ${settings.easing}`
  const reverse = settings.reverse ? -1 : 1;

  const [style, setStyle] = useState({
  })

  useEffect(() => {
    element = elementRef.current;
    return () => {
      clearTimeout(transitionTimeout);
      cancelAnimationFrame(updateCall);
    }
  }, [])


  const updatePos = () => {
    const rect = element.getBoundingClientRect();
    width = element.offsetWidth;
    height = element.offsetHeight;
    left = rect.left;
    top = rect.top;
  }

  const setTransition = () => {
    clearTimeout(transitionTimeout);
    setStyle({
      ...style,
      transition: settings.defTransition
    });

    transitionTimeout = setTimeout(() => {
      setStyle({ ...style, transition: '' });
    }, settings.speed)
  }

  const mouseEnter = event => {
    updatePos();
    setTransition();
    setStyle({...style, ...settings.condStyle.on})
  }

  const mouseMove = event => {
    event.persist();

    if (updateCall !== null) window.cancelAnimationFrame(updateCall);
    event = event;
    updateCall = requestAnimationFrame(update.bind(this, event));
  }

  const mouseLeave = () => {
    setTransition();
    if (settings.reset) reset();
  }

  const getValues = event => {
    const x = event.nativeEvent.clientX - left / width;
    const y = event.nativeEvent.clientY - top / height;
    const _x = Math.min(Math.max(x, 0), 1);
    const _y = Math.min(Math.max(y, 0), 1);
    const tiltX = (reverse * (settings.max / 2 - _x * settings.max)).toFixed(2);
    const tiltY = (reverse * (_y * settings.max - settings.max / 2)).toFixed(2);
    const percentageX = _x * 100;
    const percentageY = _y * 100;

    return {
      tiltX,
      tiltY,
      percentageX,
      percentageY
    }
  }

  const update = () => {
    const values = getValues();
    setStyle({
      ...style,
      transform: `perspective(${settings.perspective}px) rotateX(${settings.axis === 'x' ? 0 : values.tiltY}deg) rotateY(${settings.axis === 'y' ? 0 : values.tiltX}deg) scale3d(${settings.scale}, ${settings.scale}, ${settings.scale})`
    });

    updateCall = null;
  }

  const reset = () => {
    window.requestAnimationFrame(() => {
      setStyle({
        ...style, 
        ...settings.condStyle.off,
        transform: `perspective(${settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
      })
    })
  }

  return (
    <div
      ref={elementRef}
      className={props.className}
      style={{...props.style, ...style}}
      onMouseEnter={mouseEnter}
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
    >
      {props.children}
    </div>
  )
}