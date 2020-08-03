import React from "react";
import moment from "moment";

export default function Message({message, userId}) {

  const genStamp = () => 
    moment(message.date).calendar(null, {sameDay: 'LT'});
  

  const containerClass = () => 
    (message.user._id === userId) ?
      "message-container-right" :
      "message-container-left"


  return (
    <li className={containerClass()}>
      <div className="message_header">
      </div>
      <h6>{message.user.handle}<span>{genStamp()}</span></h6>
      <p>{message.content}</p>
    </li>
  )

}