// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6Dm1aZVpLlu8XjCVrQjoKVqC7F7z720Y",
  authDomain: "testudo-tracker-e039a.firebaseapp.com",
  projectId: "testudo-tracker-e039a",
  storageBucket: "testudo-tracker-e039a.appspot.com",
  messagingSenderId: "178630130980",
  appId: "1:178630130980:web:2f15467fd9d3f90e3807b1",
  measurementId: "G-YJJ0JSYT5E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };
