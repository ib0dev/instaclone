// auth.js
import { auth } from "./config";
import { db } from "./db"; // Import db from db.js
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// Reusable function to add user to Firestore
async function addUserToFirestore(user, fullName, userName) {
  try {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      fullName: fullName,
      userName: userName,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error adding user to Firestore: ", error);
    throw error;
  }
}

// Updated signUp function
export async function signUp(email, password, fullName, userName) {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add user to Firestore with additional fields
    await addUserToFirestore(user, fullName, userName);

    return user;
  } catch (error) {
    console.error("Error during signup: ", error);
    throw error; // Let the caller handle the error
  }
}

export async function logOut() {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error during logout: ", error);
    throw error; // Let the caller handle the error
  }
}

// Optional: Keep onAuthStateChanged for general user state monitoring
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.uid);
    // You can optionally call addUserToFirestore here for safety
    // addUserToFirestore(user);
  } else {
    console.log("No user signed in");
  }
});