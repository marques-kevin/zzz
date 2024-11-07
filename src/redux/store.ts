import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { playerReducer } from "./player/reducers";

const reducers = combineReducers({
  player: playerReducer,
});

export const init = (initialState = {}) => {
  const store = configureStore({
    reducer: reducers,
    preloadedState: initialState,
  });

  return { store };
};

export type RootState = ReturnType<typeof reducers>;
