import React, { useState, useEffect } from "react"
import MessageContainer from "./message_container";


export default function MessageIndex(props) {
  const [messages, setMessages] = useState([]);
  const [gameId, setGameId] = useState(props.gameId);

  useEffect(() => {
    props.watchMessages();
  }, [])

  useEffect(() => {
    if (props.gameId) props.getGameMessages(props.gameId);
    // scrollToBottom();
  }, [props.gameId])

  useEffect(() => {
    setMessages(props.messages);
    if (props.new.user._id === props.userId || nearBottom()) scrollToBottom();
  }, [props.messages, props.new]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, props.show])

  const scrollToBottom = () => 
    document
      .getElementById("bottom")
      .scrollIntoView({ block: "end", behavior: "smooth" });

  const nearBottom = () => 
    document
      .getElementById("bottom")
      .getBoundingClientRect().bottom <= (window.innerHeight - 20);


  return (props.show) ? (
    <ul id="message_box-messages_index">
      {messages.map((message, idx) =>
        <MessageContainer key={idx} message={message} />)}
      <li key={"teapot"} id="bottom">
        <div id="message_box-messages_index-filler"/>
      </li>
    </ul>
  ) : (<div id='bottom' />)
}