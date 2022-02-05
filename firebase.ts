import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

dotenv.config();

export const firebaseApp = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
});

export const firestore = getFirestore();
