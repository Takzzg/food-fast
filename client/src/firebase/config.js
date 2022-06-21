
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF1Ff5vK7hzfmMQTM7olpm5JgArkh8ydg",
  authDomain: "footfast-auth.firebaseapp.com",
  projectId: "footfast-auth",
  storageBucket: "footfast-auth.appspot.com",
  messagingSenderId: "247009519163",
  appId: "1:247009519163:web:ab8a1e95c3628f7af9de1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


 export const auth =getAuth(app)
// export const FirebaseDB   = getFirestore( FirebaseApp );

