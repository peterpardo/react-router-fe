import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice";
import { authApi } from "../services/authApiSlice";

export const store = configureStore({
  reducer: { [authApi.reducerPath]: authApi.reducer, auth: authReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
