import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGBPMGbpv6aNDjGSrFHq_wUC9ifkHfCKE",
  authDomain: "smart-moodle-ca5f5.firebaseapp.com",
  projectId: "smart-moodle-ca5f5",
  storageBucket: "smart-moodle-ca5f5.appspot.com",
  messagingSenderId: "864791853067",
  appId: "1:864791853067:web:e57bfe7cbc2ab5e6e72f0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
