import { initializeApp, getApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpb_bXW6lb3ngt3TdrQfMBWFwdyZZwJE4",
  authDomain: "madflix-70aa2.firebaseapp.com",
  projectId: "madflix-70aa2",
  storageBucket: "madflix-70aa2.appspot.com",
  messagingSenderId: "603304061958",
  appId: "1:603304061958:web:10e1ac517e81686e51a787"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export {auth , db}