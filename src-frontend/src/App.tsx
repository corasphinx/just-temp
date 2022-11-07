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
  setCurrentBiddingSnakeId,
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
let socketConnecting = false;

interface AppProps {
  currentBiddingSnakeId: string;
  setAllSnakesAction: (snakes: Array<SnakeCardData>) => void;
  initializeAllBidsListAction: (allBidsList: Array<Array<number>>) => void;
  updateSnakeAction: (snakeupdate: SnakeCardUpdate) => void;
  setCurrentBiddingSnakeId: (id: string) => void;
}

const App = ({
  currentBiddingSnakeId,
  setAllSnakesAction,
  initializeAllBidsListAction,
  updateSnakeAction,
  setCurrentBiddingSnakeId,
}: AppProps) => {
  const [socket, setSocket] = useState<Websocket.w3cwebsocket | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    initData();
    if (!onceConnected && !socketConnecting) {
      socketConnecting = true;
      initSocket();
    }
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const initData = () => {
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
  };

  const initSocket = () => {
    if (onceConnected) {
      return;
    }
    const newSocket = new Websocket.w3cwebsocket(constant.app.socketRequestUrl);
    newSocket.onopen = () => {
      socketConnecting = false;
      console.log("Socket Connected!");
      setError("");
      setSocket(newSocket);
      onceConnected = true;

      newSocket.onclose = () => {
        console.log("Socket is Closed!!!");
        setError("Socket is Closed!!!");
        setSocket(null);
        onceConnected = false;
      };
      newSocket.onmessage = (msg: Websocket.IMessageEvent) => {
        const data: SnakeCardUpdate = JSON.parse(msg.data.toString());
        console.log(data);
        updateSnakeAction(data);
        if (data.stage == 1 && data.bid > 0) {
          setCurrentBiddingSnakeId(data.id);
        } else {
          setCurrentBiddingSnakeId("");
        }
      };
    };

    newSocket.onerror = () => {
      socketConnecting = false;
      console.log("Socket Connection Error!!!");
      setError("Socket Connection Error!!!");
      setSocket(null);
      onceConnected = false;
    };
  };

  const onRetry = () => {
    initData();
    initSocket();
  };

  return (
    <div className="App">
      <Header />
      {error.length > 0 ? (
        <div className="text-center">
          <h4 className="text-white">{error}</h4>
          <button
            onClick={onRetry}
            className="btn btn-warning mt-2 w-25 fw-bold"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <MainContent />
          <BidFinish />
        </>
      )}
    </div>
  );
};

// prop-types
App.propTypes = {
  currentBiddingSnakeId: PropTypes.string.isRequired,
  setAllSnakesAction: PropTypes.func.isRequired,
  initializeAllBidsListAction: PropTypes.func.isRequired,
  updateSnakeAction: PropTypes.func.isRequired,
  setCurrentBiddingSnakeId: PropTypes.func.isRequired,
};

const mapStateToProps = (state: ReturnType<typeof store.getState>) => ({
  currentBiddingSnakeId: state.snakeCards.currentBiddingSnakeId,
});
const mapDispatchToProps = (dispatch: typeof store.dispatch) => ({
  setAllSnakesAction: (snakes: Array<SnakeCardData>) =>
    dispatch(setAllSnakesAction(snakes)),
  initializeAllBidsListAction: (allBidsList: Array<Array<number>>) =>
    dispatch(initializeAllBidsListAction(allBidsList)),
  updateSnakeAction: (snakeUpdate: SnakeCardUpdate) =>
    dispatch(updateSnakeAction(snakeUpdate)),
  setCurrentBiddingSnakeId: (id: string) =>
    dispatch(setCurrentBiddingSnakeId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
