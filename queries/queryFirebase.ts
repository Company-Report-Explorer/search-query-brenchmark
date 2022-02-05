import { deleteApp } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";
import { firebaseApp, firestore } from "../connections/firebase";

export async function queryFirestore() {
  console.time("Firestore Query Time:");

  await getDoc(doc(firestore, "default-tokens", "able"));
  await getDoc(doc(firestore, "default-tokens", "ability"));
  await getDoc(doc(firestore, "default-tokens", "about"));

  console.timeEnd("Firestore Query Time:");

  deleteApp(firebaseApp);
}
