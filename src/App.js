import 'App.css';
import { useEffect, useState } from 'react';
import io from "socket.io-client";

export default function App() {

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