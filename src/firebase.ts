import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyDq7DRHTDahl8gvDKEqCe4iaVXG4mNiLxA",
  authDomain: "udemy-todo-36de8.firebaseapp.com",
  databaseURL: "https://udemy-todo-36de8.firebaseid.com",
  projectId: "udemy-todo-36de8",
  storageBucket: "udemy-todo-36de8.appspot.com",
  messagingSenderId: "951885326030",
  appId: "1:951885326030:web:3a93bd06d9cfd25179929f",
});

export const db = getFirestore(app);
export const auth = getAuth(app);
