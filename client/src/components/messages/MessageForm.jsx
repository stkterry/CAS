import React, { useState, useEffect } from "react";
import { takeWhile } from "lodash";


export default function MessageForm(props) {

  // const [message, setMessage] = useState({
  //   user: props.userId,
  //   game: props.gameId,
  //   content: ""
  // });

  const [content, setContent] = useState("")

  // useEffect(() => {
  //   setMessage(
  //     Object.assign(message, { user: props.userId, game: props.gameId }))
  // }, [props.userId, props.gameId]);
  
  const handleSubmit = event => {
    event.preventDefault();
    console.log(props.userId, props.gameId)
    if (event.target.value.length > 0) {
      props.postMessage({
        user: props.userId,
        game: props.gameId,
        content: content
      });
      setContent("")
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
          onChange={event => setContent(event.target.value)}
          onKeyDown={event => onEnterPress(event)}
          value={content}
          placeholder={'Type your shit here!'}
        />
      </form>
    </div>
  )

}