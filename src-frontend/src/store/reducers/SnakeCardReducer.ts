import { SET_ALL_BIDS, UPDATE_BIDS, StoreAction } from "../types";

export interface SnakeCard {
  id: string;
  stage: number;
  bid: number;
  tvl: number;
}

export interface SnakeCardState {
  cardsData: Array<SnakeCard>;
  highestBid: number;
}

const initialState: SnakeCardState = {
  cardsData: [],
  highestBid: 0,
};

const SnakeCardReducer = (
  state: SnakeCardState = initialState,
  action: StoreAction
) => {
  switch (action.type) {
    case SET_ALL_BIDS: {
      return initialState;
    }
    case UPDATE_BIDS: {
      return initialState;
    }
    default:
      return initialState;
  }
};

export default SnakeCardReducer;
