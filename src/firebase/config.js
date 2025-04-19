// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBGFRaTjn9vtQ_7gQ--eNYCuzm_5gfbl00",
  authDomain: "instaclone-85520.firebaseapp.com",
  projectId: "instaclone-85520",
  storageBucket: "instaclone-85520.firebasestorage.app",
  messagingSenderId: "334449447764",
  appId: "1:334449447764:web:6ee776696365c5556daec1",
  measurementId: "G-2CRRSFZFW9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export default app;