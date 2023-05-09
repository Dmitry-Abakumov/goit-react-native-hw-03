import { authSlice } from "./authSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { updateProfile, onAuthStateChanged, signOut } from "firebase/auth";

import { auth, app } from "../../firebase/config";

const { updateUserProfile, isAuthStateChange, authSignOut } = authSlice.actions;

export const signUp =
  ({ email, password, name }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      const user = auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: user.uid,
          nickName: user.displayName,
        })
      );
    } catch (error) {
      console.log("error", error);
      console.log("error message", error.message);
    }
  };

export const signIn =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      dispatch(
        updateUserProfile({ userId: user.uid, nickName: user.displayName })
      );
    } catch (error) {
      console.log("error message", error.message);
    }
  };

export const isAuthChange = () => async (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        updateUserProfile({ userId: user.uid, nickName: user.displayName })
      );
      dispatch(isAuthStateChange({ isAuth: true }));
    }
  });
};

export const userSignOut = () => async (dispatch) => {
  await signOut(auth);
  dispatch(authSignOut());
};
