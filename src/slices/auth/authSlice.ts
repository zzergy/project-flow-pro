import { createSlice } from "@reduxjs/toolkit";
import { AuthInitialState } from "../slice.types";
import { signOut } from "@firebase/auth";
import { auth } from "../../firebase.config";

const initialState: AuthInitialState = {
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout() {
      signOut(auth);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
