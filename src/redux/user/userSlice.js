import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      (state.isLoading = true), (state.error = false);
    },
    signInInProcess: (state) => {
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      (state.isLoading = false), (state.error = null);
    },
    signInFailure: (state, action) => {
      (state.isLoading = false), (state.error = action.payload);
    },
    signUpStart: (state) => {
      (state.isLoading = true), (state.error = false);
    },
    signUpInProcess: (state) => {
      state.error = null;
    },
    signUpSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    signUpFailure: (state, action) => {
      (state.isLoading = false), (state.error = action.payload);
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signInInProcess,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  signUpInProcess,
  logoutSuccess,
} = userSlice.actions;
