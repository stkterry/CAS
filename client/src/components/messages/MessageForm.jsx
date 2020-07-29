import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextareaAutosize from "react-textarea-autosize";
import { Picker, Emoji } from "emoji-mart";

const textRef = React.createRef();
const fontIconStyle = {
  color: 'black',
  transform: "grow-2.5"
}
const pickerStyle={
  zIndex: 1,
  marginLeft: '1rem'
}

export default function MessageForm(props) {

  const [content, setContent] = useState("")
  const [showEmoji, setShowEmoji] = useState(false);
  

  const addEmoji = emoji => {
    setContent(prev => prev + emoji.native);
    textRef.current.focus();
  }
  const showPicker = () => showEmoji ? 
    <Picker 
      style={pickerStyle} 
      // native={true}
      onSelect={emoji => addEmoji(emoji)}
      emojiTooltip={true}
    /> : null
  
  const handleSubmit = event => {
    event.preventDefault();
    if (event.target.value.length > 0) {
      props.postMessage({
        user: props.userId,
        game: props.gameId,
        content: content
      });
      if (showEmoji) setShowEmoji(false);
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
      {showPicker()}
      <form id="message_box-form">
        <div
          onClick={() => setShowEmoji(!showEmoji)}
        >
          <Emoji emoji={{ id: 'smile', skin: 3 }} size={18} />
        </div>
        <TextareaAutosize
          type="text"
          onChange={event => setContent(event.target.value)}
          onKeyDown={event => onEnterPress(event)}
          value={content}
          placeholder={'Type your shit here!'}
          ref={textRef}
        />
      </form>
    </div>
  )
}