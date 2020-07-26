import React from "react";
import moment from "moment";

export default function Message(props) {

  const genStamp = () => {
    return moment(props.message.date).calendar(null, {sameDay: 'LT'});
  }

  return (
    <li className="message-container">
      <div className="message_header">
      </div>
      <h6>{props.message.handle}<span>{genStamp()}</span></h6>
      <p>{props.message.content}</p>
    </li>
  )

}