import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  email: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  email: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
