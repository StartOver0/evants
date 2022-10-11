import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAGPdhfv_ILlJJ1e_s4ZtzeErbs8hX24lQ",
  authDomain: "evants-8b35d.firebaseapp.com",
  projectId: "evants-8b35d",
  storageBucket: "evants-8b35d.appspot.com",
  messagingSenderId: "344917597398",
  appId: "1:344917597398:web:4986bd1b09874c04c23d77",
  measurementId: "G-NWJR63X9P3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export function postToJSON(doc) {
  const data = doc.data();
  let obj = {
    ...data,
  };
  delete obj.updatedAt;
  delete obj.createdAt;
  return obj;
}
