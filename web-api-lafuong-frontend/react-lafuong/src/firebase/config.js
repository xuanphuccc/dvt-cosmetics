// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env["REACT_APP_FIREBASE_API_KEY"],
  authDomain: "lafuong-af0ea.firebaseapp.com",
  projectId: "lafuong-af0ea",
  storageBucket: "lafuong-af0ea.appspot.com",
  messagingSenderId: "386456400214",
  appId: "1:386456400214:web:7a70d2c4e432400dd526f7",
  measurementId: "G-JHE8FP3Y1P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { storage, analytics };
