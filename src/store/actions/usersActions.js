import usersSlice from "../slices/usersSlice";

export const {
  logInUser,
  logInUserSuccess,
  logInUserFailure,
  logOutUser,
  logOutUserSuccess,
  logOutUserFailure,
} = usersSlice.actions;