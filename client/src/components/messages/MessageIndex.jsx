import React, { useState, useEffect } from "react"
import Message from "./Message";

import { Chance } from "chance";
const chance = new Chance();


export default function MessageIndex(props) {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(tempMessages())
  }, [props.messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages])

  const scrollToBottom = () => 
    document
      .getElementById("bottom")
      .scrollIntoView({ block: "end", behavior: "smooth" });
  
  const genDateTemp = () =>
    new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));

  const tempMessages = () => {
    let tempMessages = [];
    for (let i = 0; i < 15; i++) {
      tempMessages.push({
        content: chance.sentence(50), _id: i, user_id: "12345", handle: chance.twitter(), date: genDateTemp()
      })
    }
    return tempMessages.sort((m1, m2) => m1.date - m2.date);
  }

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