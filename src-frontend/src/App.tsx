import { useState, useEffect } from "react";

// import prop-types
import PropTypes from "prop-types";

// import types
import { SnakeCardData, SnakeCardUpdate } from "./types";

// import redux
import store from "./store";
import { connect } from "react-redux";
import {
  setAllSnakesAction,
  initializeAllBidsListAction,
  updateSnakeAction,
} from "./store/actions/SnakeCardActions";

// import scss
import "./App.scss";

// import constants
import { constant } from "./constants";

// import websockets
import * as Websocket from "websocket";

// import utils
import { getAllSnakes, getAllSnakesBids } from "./utils/snakeCards";

// import layouts
import Header from "./layouts/Header";
import MainContent from "./layouts/MainContent";

// import components
import BidFinish from "./components/BidFinish";

let onceConnected = false;

interface AppProps {
  setAllSnakesAction: (snakes: Array<SnakeCardData>) => void;
  initializeAllBidsListAction: (allBidsList: Array<Array<number>>) => void;
  updateSnakeAction: (snakeupdate: SnakeCardUpdate) => void;
}

const App = ({
  setAllSnakesAction,
  initializeAllBidsListAction,
  updateSnakeAction,
}: AppProps) => {
  const [socket, setSocket] = useState<Websocket.w3cwebsocket | null>(null);

  useEffect(() => {
    getAllSnakes()
      .then((res) => {
        setAllSnakesAction(res);
        getAllSnakesBids(res.map((e) => e.id))
          .then((allBidsList) => {
            initializeAllBidsListAction(allBidsList);
          })
          .catch((err) => {
            console.log("error while fetching all snakes bids data: ", err);
          });
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
          console.log(JSON.parse(msg.data.toString()));
          updateSnakeAction(JSON.parse(msg.data.toString()));
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
      <BidFinish />
    </div>
  );
};

// prop-types
App.propTypes = {
  setAllSnakesAction: PropTypes.func.isRequired,
  initializeAllBidsListAction: PropTypes.func.isRequired,
  updateSnakeAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state: ReturnType<typeof store.getState>) => ({});
const mapDispatchToProps = (dispatch: typeof store.dispatch) => ({
  setAllSnakesAction: (snakes: Array<SnakeCardData>) =>
    dispatch(setAllSnakesAction(snakes)),
  initializeAllBidsListAction: (allBidsList: Array<Array<number>>) =>
    dispatch(initializeAllBidsListAction(allBidsList)),
  updateSnakeAction: (snakeUpdate: SnakeCardUpdate) =>
    dispatch(updateSnakeAction(snakeUpdate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
