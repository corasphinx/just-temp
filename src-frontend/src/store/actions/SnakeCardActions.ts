import {
  SET_ALL_SNAKES,
  UPDATE_SNAKE,
  StoreAction,
  INITIALIZE_ALL_BIDS_LIST,
} from "../types";

// import types
import { SnakeCardData, SnakeCardUpdate } from "../../types";

export const setAllSnakesAction: (
  snakes: Array<SnakeCardData>
) => StoreAction = (snakes) => {
  return {
    payload: snakes,
    type: SET_ALL_SNAKES,
  };
};

export const initializeAllBidsList: (
  allBidsList: Array<Array<number>>
) => StoreAction = (allBidsList) => {
  return {
    payload: allBidsList,
    type: INITIALIZE_ALL_BIDS_LIST,
  };
};

export const updateSnakeAction: (
  snakeUpdate: SnakeCardUpdate
) => StoreAction = (snakeUpdate) => {
  return {
    payload: snakeUpdate,
    type: UPDATE_SNAKE,
  };
};
