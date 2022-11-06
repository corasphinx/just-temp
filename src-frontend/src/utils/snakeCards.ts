import axios from "axios";

// import types
import { SnakeCardData, SnakeCardUpdate } from "../types";

// import constants
import { constant } from "../constants";

const getAllSnakes: () => Promise<Array<SnakeCardData>> = () => {
  return new Promise<Array<SnakeCardData>>((resolve, reject) => {
    try {
      axios
        .get<Array<SnakeCardUpdate>>(constant.app.apiUrl + "snakes")
        .then((res) => {
          resolve(
            res.data.map((e) => ({
              id: e.id,
              stage: e.stage,
              bids: [],
            }))
          );
        });
    } catch (err) {
      reject(err);
    }
  });
};

const getSnakeTVL: (bids: Array<number>) => number = (bids) => {
  return bids.reduce((sum, cur) => sum + cur, 0);
};

const getHighestBid: (bids: Array<number>) => number = (bids) => {
  if (bids.length === 0) {
    return 0;
  } else {
    return Math.max(...bids);
  }
};

export { getAllSnakes, getSnakeTVL, getHighestBid };
