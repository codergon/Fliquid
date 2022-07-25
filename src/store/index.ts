import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootSlice";

const store = configureStore({
  reducer: {
    main: rootReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
