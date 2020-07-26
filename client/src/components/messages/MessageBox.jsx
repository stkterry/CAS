import React from "react";

import MessageForm from "./MessageForm";
import MessageIndex from "./MessageIndex";
class MessageBox extends React.Component {



  render = () => {

    return (
      <div id="message_box">
        <div id="message_box-left">
          <div id="message_box-info"></div>
          <div id="message_box-users"></div>
        </div>
        <div id="message_box-right">
          <div id="message_box-body">
            <MessageForm />
            <MessageIndex />
          </div>
        </div>
      </div>

    )
  }
}

// <div id="message_box-container">
// </div>
export default MessageBox;
