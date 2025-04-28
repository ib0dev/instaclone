import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import app from "./config";

const db = getFirestore(app);

export const postsCollection = collection(db, "posts");

export {
  db,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
};
