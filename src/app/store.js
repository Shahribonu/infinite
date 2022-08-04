import { configureStore } from "@reduxjs/toolkit";
import numberReducer from "../features/numberSlice";

const store = configureStore({
  reducer: {
    number: numberReducer,
  },
});

export default store;
