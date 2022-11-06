import { useState, useEffect } from "react";

// import scss
import "./App.scss";

// import constants
import { constant } from "./constants";

// import layouts
import Header from "./layouts/Header";
import MainContent from "./layouts/MainContent";

// import websockets
import * as Websocket from "websocket";

// import utils
import { getAllSnakes } from "./utils/snakeCards";

let onceConnected = false;

const App = () => {
  const [socket, setSocket] = useState<Websocket.w3cwebsocket | null>(null);

  useEffect(() => {
    if (!onceConnected) {
      const newSocket = new Websocket.w3cwebsocket(
        constant.app.socketRequestUrl
      );
      newSocket.onopen = () => {
        newSocket.send("Hello!");
        newSocket.onmessage = (msg: Websocket.IMessageEvent) => {
          console.log(msg.data);
        };

        newSocket.onclose = () => {
          console.log("Socket is closed");
        };
      };
      setSocket(newSocket);
      onceConnected = true;
    }
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <MainContent />
    </div>
  );
};

export default App;
