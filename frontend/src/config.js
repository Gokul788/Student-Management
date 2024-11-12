
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "",
  authDomain: "studentmanegment-b21f6.firebaseapp.com",
  projectId: "studentmanegment-b21f6",
  storageBucket: "studentmanegment-b21f6.firebasestorage.app",
  messagingSenderId: "823242791565",
  appId: "1:823242791565:web:2ac508aa9b57c3d92c20c4",
  measurementId: "G-32DMKSKVMP"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth