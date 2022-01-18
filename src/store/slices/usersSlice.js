import {createSlice} from "@reduxjs/toolkit";

const name = 'users';

export const initialState = {
  user: null,
  errLogIn: null,
  errLogOut: null,
  logInLoading: false,
  logOutLoading: false,
};

const usersSlice = createSlice({
  name,
  initialState,
  reducers: {
    logInUser(state) {
      state.logInLoading = true;
      state.errLogIn = null;
    },
    logInUserSuccess(state, {payload}) {
      state.user = payload;
      state.logInLoading = false;
    },
    logInUserFailure(state, {payload}) {
      state.logInLoading = false;
      state.errLogIn = payload;
    },
    logOutUser(state) {
      state.logOutLoading = true;
      state.errLogOut = null;
    },
    logOutUserSuccess(state) {
      state.user = null;
      state.logOutLoading = false;
    },
    logOutUserFailure(state, {payload}) {
      state.logOutLoading = false;
      state.errLogOut = payload;
    },
  }
});

export default usersSlice;