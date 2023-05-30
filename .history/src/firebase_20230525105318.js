import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDp4Yius1SpU7EqhZUvxSDdzioza1LvIwY",
  authDomain: "todo-app-61d1b.firebaseapp.com",
  projectId: "todo-app-61d1b",
  storageBucket: "todo-app-61d1b.appspot.com",
  messagingSenderId: "542505815221",
  appId: "1:542505815221:web:f99344d2f74e2a9d1e02fc",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const storage = getStorage(app);
//Initialize Firestore
export { db };
