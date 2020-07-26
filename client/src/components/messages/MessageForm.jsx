import React, { useState, setState } from "react";
import { takeWhile } from "lodash";




export default function MessageForm(props) {

  const [message, setMessage] = useState("");
  const [messArr, setMessArr] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();
    if (event.target.value.length > 0) {
      setMessArr(prevArray => [...prevArray, message]);
      setMessage("")
    }
  }
  const onEnterPress = event => {
    if (event.keyCode == 13 && event.shiftKey == false) {
      handleSubmit(event);
    }
  }

  return (
    <div id="message_box-form-gutter">
      <form id="message_box-form">
        <textarea
          type="text"
          onChange={event => setMessage(event.target.value)}
          onKeyDown={event => onEnterPress(event)}
          value={message}
          placeholder={'Type your shit here!'}
        />
      </form>
    </div>
  )





}