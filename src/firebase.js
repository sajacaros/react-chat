import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC9xFp8GJEKQ_1KfIPJ2LGCu4kjzp1ko4M",
  authDomain: "react-chat-4d0ff.firebaseapp.com",
  projectId: "react-chat-4d0ff",
  storageBucket: "react-chat-4d0ff.appspot.com",
  messagingSenderId: "310258500430",
  appId: "1:310258500430:web:ea5aa965e4429a1136941f"
};

firebase.initializeApp(firebaseConfig);

export default firebase;