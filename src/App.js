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

  return (
    <div className="App">
      <h1>Web Sockets React</h1>
    </div>
  );
}