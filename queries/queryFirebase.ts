import { deleteApp } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";
import { firebaseApp, firestore } from "../connections/firebase";

export async function queryFirestore(size: number = 5) {
  await queryDefaultFirestore(size);
  await queryPackedFirestore(size);
  deleteApp(firebaseApp);
}

export async function queryDefaultFirestore(size: number = 5) {
  const before = Date.now();

  let reviewIDs: string[] = [];
  for (let i = 0; i < size; i++) {
    const token = (
      await getDoc(doc(firestore, "default-tokens", `token${i}`))
    ).data();
    if (token) reviewIDs.push(token.reviewID);
  }
  reviewIDs = Array.from(new Set(reviewIDs));

  const reviews = [];
  for (let i = 0; i < reviewIDs.length; i++)
    reviews.push(
      (await getDoc(doc(firestore, "default-books", reviewIDs[i]))).data()
    );

  const after = Date.now();
  console.log("Firestore Query Time:", after - before);
}

async function queryPackedFirestore(size: number) {
  const before = Date.now();

  let reviews: string[] = [];
  for (let i = 0; i < size; i++) {
    const token = (
      await getDoc(doc(firestore, "default-tokens", `token${i}`))
    ).data();
    if (token) reviews.push(token.review);
  }

  const after = Date.now();
  console.log("Packed MongoDB Query Time:", after - before);
}
