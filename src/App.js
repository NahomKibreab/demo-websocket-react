import 'App.css';
import { useEffect, useState } from 'react';
import io from "socket.io-client";

export default function App() {
  const [socket, setSocket] = useState();
  const [notify, setNotify] = useState("");
  const [status, setStatus] = useState({});
  const [name, setName] = useState("");

  const onNameChange = function(event) {
    setName(event.target.value);
  };

  const onRegister = function() {
    if (socket && name) {
      socket.emit('register', name);
    }
  };

  useEffect(() => {
    const socket = io("/");
    setSocket(socket);
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
        <div><span>{status.connected}</span> clients connected</div>
        <div><span >{status.active}</span> clients active</div>
        <div className="notify">{notify}</div>
      </h4>
      <div><input value={name} onChange={onNameChange} placeholder="Name" /></div>
      <button onClick={onRegister}>Register</button>
      <button id="offline">Offline</button>
    </div>
  );
}