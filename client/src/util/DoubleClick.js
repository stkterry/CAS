import React, { useCallback, useState, useRef, useEffect } from 'react';

const DOUBLE_CLICK_SPEED = 200;

export default function DoubleClick (callback) {

  const [element, setElement] = useState(null);
  const timer = useRef(null);
  const count = useRef(0);
  const input = useRef(null);

  const ref = useCallback(node => {
    setElement(node);
    ref.current = node;
  }, []);

  useEffect(() => { input.current = callback; });

  useEffect(() => {
    function handleEvent() {
      const doubleClicked = count.current + 1 === 2;
      const timed = timer.current;
      if (timed && doubleClicked) {
        clearTimeout(timer.current);
        timer.current = null;
        count.current = 0;
        if (input.current) input.current();
      }
      if (!timed) {
        count.current = count.current + 1;
        const newTimer = setTimeout(() => {
          clearTimeout(timer.current);
          timer.current = null;
          count.current = 0;
        }, DOUBLE_CLICK_SPEED)
        timer.current = newTimer;
      }
    }
    if (element) {
      console.log(element)
      element.addEventListener('click', handleEvent);}

    return () => {
      if (element) element.removeEventListner('click', handleEvent);;
    }
  }, [element]);

  return [ref, element]
};