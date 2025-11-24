import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCP6ZDZcxtsivyPDvNu5f-NRu8oA4YzZmA",
  authDomain: "fir-admin-7c0a1.firebaseapp.com",
  projectId: "fir-admin-7c0a1",
  storageBucket: "fir-admin-7c0a1.firebasestorage.app",
  messagingSenderId: "636913346369",
  appId: "1:636913346369:web:bb833fc34579d4a7afa3c0"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

