// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getDatabase } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  // Place your Firebase configuration here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export {database, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut};