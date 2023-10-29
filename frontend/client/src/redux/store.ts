import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./reducers/user.reducer";
import { auth } from "./api/auth/auth";
export const store = configureStore({
  reducer: {
    user: userReducer,
    [auth.reducerPath]: auth.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(auth.middleware),
});

setupListeners(store.dispatch);
