import { combineReducers } from "redux";

//import reducers
import SnakeCardReducer from "./SnakeCardReducer";

export default combineReducers({
  snakeCards: SnakeCardReducer,
});
