import 'App.css';
import { useEffect, useState } from 'react';
import io from "socket.io-client";

export default function App() {
  const [messages, setMessages] = useState([]);

  const clear = function() {
    setMessages([]);
  };

  useEffect(() => {
    const socket = io("/");
    socket.on('connect', event => {
      console.log("connected");
    });

    socket.on('public', msg => {
      setMessages(prev => ["Broadcast: " + msg, ...prev]);
    });

    // ensures we disconnect to avoid memory leaks
    return () => socket.disconnect();
  }, []);

  // console.log(messages);

  const list = messages.map((msg, i) => {
    return <li key={i}>{msg}</li>;
  });

  return (
    <div className="App">
      <h2>Socket.io Demo</h2>

      {messages.length > 0 &&
        <button onClick={clear}>Clear</button>
      }

      <ul>
        {list}
      </ul>

    </div>
  );
}