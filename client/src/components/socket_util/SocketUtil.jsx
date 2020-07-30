import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = 'http://127.0.0.1:5002';

export default function SocketUtil () {

  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    })

    return () => socket.disconnect();
  }, []);


  return (
    <p>
      It's <time style={{color: 'white'}} dateTime={response}>{response}</time>;
    </p>
  )
}