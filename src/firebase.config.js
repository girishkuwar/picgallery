// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdAYobPEztCUOXZPq9lp4xJyA0NiXHQzo",
  authDomain: "picgallery-606b9.firebaseapp.com",
  projectId: "picgallery-606b9",
  storageBucket: "picgallery-606b9.appspot.com",
  messagingSenderId: "512368435472",
  appId: "1:512368435472:web:ce39a6af4131284d3f8595"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);