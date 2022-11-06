import { SET_ALL_SNAKES, UPDATE_SNAKE, StoreAction } from "../types";

// import types
import { SnakeCardData } from "../../types";

export const setAllSnakesAction: (
  snakes: Array<SnakeCardData>
) => StoreAction = (snakes) => {
  return {
    payload: snakes,
    type: SET_ALL_SNAKES,
  };
};
