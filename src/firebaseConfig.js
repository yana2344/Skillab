import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // if using auth
import { getFirestore } from "firebase/firestore"; // if using Firestore
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database"; // if using Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyB2kuKvEd1tn1iKRygNc0EVb5Q3ViMwLR4",
  authDomain: "skillab-cdb1a.firebaseapp.com",
  projectId: "skillab-cdb1a",
  storageBucket: "skillab-cdb1a.firebasestorage.app",
  messagingSenderId: "647653455850",
  appId: "1:647653455850:web:a60310cccfa48f781ea493",
  measurementId: "G-D1KMD5MCMQ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);
export { auth, db, storage, database };
const analytics = getAnalytics(app);