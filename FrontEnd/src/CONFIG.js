import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAl2qwsb0YscsA2XaC6Rb659OVyaq6yhZY",
  authDomain: "steambazarnepal.firebaseapp.com",
  projectId: "steambazarnepal",
  storageBucket: "steambazarnepal.appspot.com",
  messagingSenderId: "951626345599",
  appId: "1:951626345599:web:82c8527928e653c043634a",
  measurementId: "G-CCW6VZTCWJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();

export { auth, provider };
export default db;
