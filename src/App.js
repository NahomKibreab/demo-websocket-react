import 'App.css';
import { useEffect, useState } from 'react';
import io from "socket.io-client";

export default function App() {
  const [notify, setNotify] = useState("");
  const [status, setStatus] = useState({});

  useEffect(() => {
    const socket = io("/");
    socket.on('connect', event => {
      console.log("connected");
    });

    socket.on('status', msg => {
      setStatus(prev => msg);
    });

    socket.on('notify', msg => {
      setNotify(prev => msg);
    });

    // ensures we disconnect to avoid memory leaks
    return () => socket.disconnect();
  }, []);

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