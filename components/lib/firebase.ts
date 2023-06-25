// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzlYpv_qzzpPCBOtGLtA7SJQ-jlfEO6SQ",
  authDomain: "load-link-nextjs.firebaseapp.com",
  projectId: "load-link-nextjs",
  storageBucket: "load-link-nextjs.appspot.com",
  messagingSenderId: "734260737622",
  appId: "1:734260737622:web:fd55e94566821799f3adf7",
  measurementId: "G-FQE4RJG1YW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
