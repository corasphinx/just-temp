import {
  SET_ALL_SNAKES,
  UPDATE_SNAKE,
  StoreAction,
  INITIALIZE_ALL_BIDS_LIST,
} from "../types";

// import utils
import clone from "clone";

// import types
import { SnakeCardData, SnakeCardUpdate } from "../../types";

export interface SnakeCardState {
  cardsData: Array<SnakeCardData>;
  finishedSnakeCards: Array<SnakeCardData>;
}

const initialState: SnakeCardState = {
  cardsData: [],
  finishedSnakeCards: [],
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
        ...state,
        cardsData: [].concat(action.payload),
      };
    }
    case UPDATE_SNAKE: {
      const updatePayload: SnakeCardUpdate = action.payload;
      let foundIndex = state.cardsData
        .map((e) => e.id)
        .findIndex((id) => id === updatePayload.id);

      let newCardsData: Array<SnakeCardData> = clone(state.cardsData);
      // stage 1
      if (updatePayload.stage === 1) {
        // case: bid in stage 1
        if (foundIndex >= 0) {
          newCardsData[foundIndex].stage = 1;
          newCardsData[foundIndex].bids.push(updatePayload.bid);
          return {
            ...state,
            cardsData: newCardsData,
          };
        }
        // case: move from stage 3 to newly created stage 1
        else {
          let previousId: string = updatePayload.previousId;
          let newFinishedSnakeCards: Array<SnakeCardData> = clone(
            state.finishedSnakeCards
          );
          if (previousId.length > 0) {
            let previousIndex: number = state.cardsData.findIndex(
              (e) => e.id === previousId
            );
            if (previousIndex >= 0) {
              newFinishedSnakeCards.push(state.cardsData[previousIndex]);
              newCardsData.splice(previousIndex, 1);
            }
          }

          newCardsData.push({
            id: updatePayload.id,
            stage: 1,
            bids: [],
            hasInitialized: true,
          });
          return {
            finishedSnakeCards: newFinishedSnakeCards,
            cardsData: newCardsData,
          };
        }
      }
      // stage 2
      else if (updatePayload.stage === 2) {
        //case: move from stage 1 to stage 2
        if (updatePayload.bid === 0) {
          newCardsData[foundIndex].stage = updatePayload.stage;
          return {
            ...state,
            cardsData: newCardsData,
          };
        }
        // case: withdraw bid in stage 2
        else {
          newCardsData[foundIndex].stage = updatePayload.stage;
          let bidFoundIndex = newCardsData[foundIndex].bids.findIndex(
            (e) => e === updatePayload.bid
          );
          if (bidFoundIndex >= 0) {
            newCardsData[foundIndex].bids[bidFoundIndex] = 0;
          }
          return {
            ...state,
            cardsData: newCardsData,
          };
        }
      }
      // stage 3
      else {
        // case: move from stage 2 to stage 3
        newCardsData[foundIndex].stage = 3;
        return {
          ...state,
          cardsData: newCardsData,
        };
      }
    }
    case INITIALIZE_ALL_BIDS_LIST: {
      return {
        ...state,
        finishedSnakeCards: [],
        cardsData: state.cardsData.map((card, index) => ({
          id: card.id,
          stage: card.stage,
          bids: [].concat(action.payload[index]),
          hasInitialized: true,
        })),
      };
    }
    default:
      return initialState;
  }
};

export default SnakeCardReducer;
