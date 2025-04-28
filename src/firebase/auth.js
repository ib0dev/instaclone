import { auth } from "./config";
import { db } from "./db";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

async function addUserToFirestore(
  user,
  fullName,
  userName,
  posts,
  profilePicture
) {
  try {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      fullName: fullName,
      userName: userName,
      posts: posts || [],
      profilePicture: profilePicture || "",
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error adding user to Firestore: ", error);
    throw error;
  }
}

export async function signUp(
  email,
  password,
  fullName,
  userName,
  posts,
  profilePictureFile
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    let profilePictureUrl = "";
    if (profilePictureFile) {
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      await uploadBytes(storageRef, profilePictureFile);
      profilePictureUrl = await getDownloadURL(storageRef);
    }

    const initialPosts =
      posts && posts.length > 0
        ? posts
        : [
            {
              content: `Welcome post by ${userName}!`,
              createdAt: new Date(),
              likes: 0,
            },
          ];

    await addUserToFirestore(
      user,
      fullName,
      userName,
      initialPosts,
      profilePictureUrl
    );

    return user;
  } catch (error) {
    console.error("Error during signup: ", error);
    throw error;
  }
}

export async function updateProfilePicture(userId, profilePictureFile) {
  try {
    const storageRef = ref(storage, `profilePictures/${userId}`);
    await uploadBytes(storageRef, profilePictureFile);
    const profilePictureUrl = await getDownloadURL(storageRef);

    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      profilePicture: profilePictureUrl,
    });

    return profilePictureUrl;
  } catch (error) {
    console.error("Error updating profile picture: ", error);
    throw error;
  }
}

export async function logOut() {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error during logout: ", error);
    throw error;
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.uid);
  } else {
    console.log("No user signed in");
  }
});
