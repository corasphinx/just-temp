import { configureStore } from "@reduxjs/toolkit";

// import reducers
import reducer, { AppState } from "./reducers";

export type StoreState = AppState;

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});
