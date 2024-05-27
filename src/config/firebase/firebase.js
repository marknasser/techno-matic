import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const userCol = collection(firestore, "users");

export const productsCol = collection(firestore, "products");
