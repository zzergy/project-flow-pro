import { createSlice } from "@reduxjs/toolkit";
import { AuthInitialState } from "../slice.types";
import { signOut } from "@firebase/auth";
import { auth } from "../../firebase.config";

const initialState: AuthInitialState = {
  error: null,
  isLoading: false,
  isLoggedIn: Boolean(localStorage.getItem("token")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      signOut(auth);
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
    checkIsLoggedIn(state) {
      state.isLoggedIn = Boolean(localStorage.getItem("token"));
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { logout, checkIsLoggedIn, clearError } = authSlice.actions;

export default authSlice.reducer;
