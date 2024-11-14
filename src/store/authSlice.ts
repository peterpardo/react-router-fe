import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  email: string | null;
  role: "user" | "admin" | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  email: null,
  role: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.email = action.payload.email;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.role = action.payload.role;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
