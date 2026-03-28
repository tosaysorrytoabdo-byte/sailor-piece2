import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDffs9FtEoVAT9XvnRnzu60w0a3hRPk_qE",
  authDomain: "sailor-piece.firebaseapp.com",
  projectId: "sailor-piece",
  storageBucket: "sailor-piece.firebasestorage.app",
  messagingSenderId: "301347436323",
  appId: "1:301347436323:web:2f1ddd7c52f3f9bc053e96",
  measurementId: "G-J8L71HSFVP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
