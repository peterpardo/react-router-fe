import { createSlice } from "@reduxjs/toolkit";

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
  reducers: {},
});

export default authSlice.reducer;
