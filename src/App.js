import 'App.css';
import { useEffect, useState } from 'react';
import io from "socket.io-client";

export default function App() {
  const [notify, setNotify] = useState("");
  const [status, setStatus] = useState({});

  const clear = function() {
    setMessages([]);
  };

  useEffect(() => {
    const socket = io("/");
    socket.on('connect', event => {
      console.log("connected");
    });

    // disconnect to avoid memory leaks
    return () => socket.disconnect();
  }, []);

  // console.log(messages);

  // const list = status.map((msg, i) => {
  //   return <li key={i}>{msg}</li>;
  // });

  return (
    <div className="App">
      <h1>Web Sockets React</h1>
      <h4>
        <div><span class="connected">{status.connected}</span> clients connected</div>
        <div class="notify">{notify}</div>
      </h4>
    </div>
  );
}