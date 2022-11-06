import { SET_ALL_SNAKES, UPDATE_SNAKE, StoreAction } from "../types";

// import types
import { SnakeCardData } from "../../types";

export interface SnakeCardState {
  cardsData: Array<SnakeCardData>;
}

const initialState: SnakeCardState = {
  cardsData: [],
};

const SnakeCardReducer: (
  state: SnakeCardState,
  action: StoreAction
) => SnakeCardState = (
  state: SnakeCardState = initialState,
  action: StoreAction
) => {
  switch (action.type) {
    case SET_ALL_SNAKES: {
      return {
        cardsData: [].concat(action.payload),
      };
    }
    case UPDATE_SNAKE: {
      return initialState;
    }
    default:
      return initialState;
  }
};

export default SnakeCardReducer;
