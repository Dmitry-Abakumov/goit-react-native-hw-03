import { createSlice } from "@reduxjs/toolkit";
import { store } from "../store";

const initialState = {
  userId: null,
  nickName: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (store, { payload: { userId, nickName } }) => ({
      ...store,
      userId,
      nickName,
    }),
    isAuthStateChange: (store, { payload: { isAuth } }) => ({
      ...store,
      isAuth,
    }),
    authSignOut: () => initialState,
  },
});

export default authSlice.reducer;
