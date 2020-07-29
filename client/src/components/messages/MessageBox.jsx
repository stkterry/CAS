import React, { useState, useEffect } from "react";

import MessageIndexContainer from "./message_index_container";
import MessageFormContainer from "./message_form_container";



export default function MessageBox(props) {

  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div id="message_box" style={show ? {} : { visibility: 'hidden' }}>
      <div id="message_box-left">
        <div id="message_box-info"></div>
        <div id="message_box-users"></div>
      </div>
      <div id="message_box-right">
        <div id="message_box-body">
          {show && <MessageFormContainer />}
          <MessageIndexContainer show={show}/>
        </div>
      </div>
    </div>
  )
}
