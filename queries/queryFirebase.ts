import { deleteApp } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";
import { firebaseApp, firestore } from "../connections/firebase";

export async function queryFirestore() {
  const before = Date.now();

  await getDoc(doc(firestore, "default-tokens", "able"));
  await getDoc(doc(firestore, "default-tokens", "ability"));
  await getDoc(doc(firestore, "default-tokens", "about"));

  const after = Date.now();
  console.log("Firestore Query Time:", after - before);

  deleteApp(firebaseApp);
}
