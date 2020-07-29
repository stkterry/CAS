import React, { useState, useEffect } from "react"
import MessageContainer from "./message_container";


export default function MessageIndex(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    props.getGameMessages(props.gameId);
    // scrollToBottom();
  }, [props.gameId])

  useEffect(() => {
    setMessages(props.messages)
  }, [props.messages]);

  useEffect(() => {
    if (props.new) setMessages(prevMessages => [...prevMessages, props.new]);
  }, [props.new])  
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, props.show])

  const scrollToBottom = () => 
    document
      .getElementById("bottom")
      .scrollIntoView({ block: "end", behavior: "smooth" });
  

  return (props.show) ? (
    <ul id="message_box-messages_index">
      {messages.map(message =>
        <MessageContainer key={message._id} message={message} />)}
      <li key={"teapot"} id="bottom">
        <div id="message_box-messages_index-filler"/>
      </li>
    </ul>
  ) : (<div id='bottom' />)
}