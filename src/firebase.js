import * as firebase from "firebase";
import "@firebase/firestore";

const config = {
  apiKey: "AIzaSyAE7PQD37_QJpCup8Siy17Jxvb5r9SVEvM",
  authDomain: "chat-b538c.firebaseapp.com",
  databaseURL: "https://chat-b538c.firebaseio.com",
  projectId: "chat-b538c",
  storageBucket: "chat-b538c.appspot.com",
  messagingSenderId: "452440696031",
  appId: "1:452440696031:web:eb3248be0c9e35c9a3b56a",
};

firebase.initializeApp(config);

export const db = firebase.firestore();
