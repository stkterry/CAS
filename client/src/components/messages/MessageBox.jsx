import React from "react";


class MessageBox extends React.Component {



  render = () => {

    return (
      <div id="message_box-container">
      <div id="message_box">
        <div id="message_box-left">
          <div id="message_box-info"></div>
          <div id="message_box-users"></div>
        </div>
        <div id="message_box-right">
          <div id="message_box-body"></div>
        </div>
      </div>
      </div>
    )
  }
}


export default MessageBox;