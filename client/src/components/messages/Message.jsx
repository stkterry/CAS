import React from "react";
import moment from "moment";

export default function Message(props) {

  const genStamp = () => {
    return moment(props.message.date).calendar(null, {sameDay: 'LT'});
  }

  const containerClass = () => 
    (props.message.user._id === props.userId) ?
      "message-container-right" :
      "message-container-left"

  return (
    <li className={containerClass()}>
      <div className="message_header">
      </div>
      <h6>{props.message.user.handle}<span>{genStamp()}</span></h6>
      <p>{props.message.content}</p>
    </li>
  )

}