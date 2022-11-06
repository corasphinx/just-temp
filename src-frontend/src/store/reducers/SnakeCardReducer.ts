import { SET_ALL_SNAKES, UPDATE_SNAKE, StoreAction } from "../types";

export interface SnakeCard {
  id: string;
  stage: number;
  bids: Array<number>;
}

export interface SnakeCardState {
  cardsData: Array<SnakeCard>;
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
