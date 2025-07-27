// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDY43TkvJcsphH6HDFkaWz_YvON9hXRdQ",
  authDomain: "vendomart-2553d.firebaseapp.com",
  projectId: "vendomart-2553d",
  storageBucket: "vendomart-2553d.firebasestorage.app",
  messagingSenderId: "822774709687",
  appId: "1:822774709687:web:fd5cc8fa4de65b7f68bc32",
  measurementId: "G-XGLG3HQXMC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);