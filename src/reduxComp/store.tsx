import { configureStore,applyMiddleware } from "@reduxjs/toolkit";
import SliceReducer from "./slice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: SliceReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
