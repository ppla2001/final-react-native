import firebase from "firebase";
import app from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDPb7x6p2B57Fbnd20BtDyr8By1HPdrqUI",
  authDomain: "primer-proyecto-b18eb.firebaseapp.com",
  projectId: "primer-proyecto-b18eb",
  storageBucket: "primer-proyecto-b18eb.appspot.com",
  messagingSenderId: "747697702713",
  appId: "1:747697702713:web:d3fc3a3252f73ada3ecae8",
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
