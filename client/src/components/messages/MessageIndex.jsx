import React, { useState, useEffect } from "react"
import Message from "./Message";

import { Chance } from "chance";
const chance = new Chance();


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
  }, [messages])

  const scrollToBottom = () => 
    document
      .getElementById("bottom")
      .scrollIntoView({ block: "end", behavior: "smooth" });
  

  return (
    <ul id="message_box-messages_index">
      {messages.map(message =>
        <Message key={message._id} message={message} />)}
      <li key={"teapot"} id="bottom">
        <div id="message_box-messages_index-filler"/>
      </li>
    </ul>
  )
}