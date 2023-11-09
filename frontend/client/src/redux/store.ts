import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { auth } from "./api/auth/auth";
import userReducer from "./reducers/user.reducer";
import registerReducer from "./reducers/register.reducer";
export const store = configureStore({
  reducer: {
    user: userReducer,
    register: registerReducer,
    [auth.reducerPath]: auth.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(auth.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
