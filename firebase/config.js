import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpjY-j8riKnTqepscPM2SGN-D7oGIElQM",
  authDomain: "goit-project-38058.firebaseapp.com",
  projectId: "goit-project-38058",
  storageBucket: "goit-project-38058.appspot.com",
  messagingSenderId: "363924577462",
  appId: "1:363924577462:web:6d4efa4c883260bb17da17",
  measurementId: "G-M2G299Y969",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
