// reducer actions
export const SET_ALL_SNAKES: string = "SET_ALL_SNAKES";
export const UPDATE_SNAKE: string = "UPDATE_SNAKE";

// types
export interface StoreAction {
  type: string;
  payload: any;
}
