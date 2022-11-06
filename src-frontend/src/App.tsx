import { useState, useEffect } from "react";

// import prop-types
import PropTypes from "prop-types";

// import types
import { SnakeCardData } from "./types";

// import redux
import store from "./store";
import { connect } from "react-redux";
import { setAllSnakesAction } from "./store/actions/SnakeCardActions";

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

interface AppProps {
  setAllSnakesAction: (data: Array<SnakeCardData>) => void;
}

const App = ({ setAllSnakesAction }: AppProps) => {
  const [socket, setSocket] = useState<Websocket.w3cwebsocket | null>(null);

  useEffect(() => {
    getAllSnakes()
      .then((res) => {
        setAllSnakesAction(res);
      })
      .catch((err) => {
        console.log("error while fetching all snakes data: ", err);
      });

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

App.propTypes = {
  setAllSnakesAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state: ReturnType<typeof store.getState>) => ({});
const mapDispatchToProps = (dispatch: typeof store.dispatch) => ({
  setAllSnakesAction: (data: Array<SnakeCardData>) =>
    dispatch(setAllSnakesAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
