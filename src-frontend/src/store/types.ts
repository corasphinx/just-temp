// reducer actions
export const SET_ALL_SNAKES: string = "SET_ALL_SNAKES";
export const UPDATE_SNAKE: string = "UPDATE_SNAKE";
export const INITIALIZE_ALL_BIDS_LIST: string = "INITIALIZE_ALL_BIDS_LIST";

// types
export interface StoreAction {
  type: string;
  payload: any;
}
