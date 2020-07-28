import React from "react";

import MessageIndexContainer from "./message_index_container";
import MessageFormContainer from "./message_form_container";
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
            <MessageFormContainer />
            <MessageIndexContainer />
          </div>
        </div>
      </div>

    )
  }
}

// <div id="message_box-container">
// </div>
export default MessageBox;
