import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDO8oa5jXFFGvbNcA5nbpOaKPcwFIWqtN8",
    authDomain: "temporada-de-patos.firebaseapp.com",
    projectId: "temporada-de-patos",
    storageBucket: "temporada-de-patos.appspot.com",
    messagingSenderId: "1042917914585",
    appId: "1:1042917914585:web:cc59b6e15db186939a8bc8"
  };


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
