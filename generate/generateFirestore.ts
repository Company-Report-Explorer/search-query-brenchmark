import { deleteApp } from "firebase/app";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import { firebaseApp, firestore } from "../connections/firebase";

export async function generateFirestore() {
  const _guard = await firestoreGuard();
  if (!_guard) {
    console.log("Firestore has already been generated");
    deleteApp(firebaseApp);
    return;
  }

  console.log("Start Generating `default-tokens`...");

  for (let i = 0; i < 1000; i++) {
    await setDoc(doc(firestore, "default-tokens", `token${i}`), {
      reviewID: `review${Math.floor(Math.random() * 500)}`,
      count: Math.floor(Math.random() * 300 + 5),
      positions: new Array(Math.floor(Math.random() * 10 + 1))
        .fill(0)
        .map(() => Math.floor(Math.random() * 300 + 5)),
    });
  }

  console.log("Finished Generating `default-tokens`");
  console.log("Start Generating `default-reviews`...");

  for (let i = 0; i < 500; i++) {
    await setDoc(doc(firestore, "default-books", `review${i}`), {
      bookID: `book${Math.floor(Math.random() * 500)}`,
      totalWords: Math.floor(Math.random() * 100000 + 10000),
      rating: Math.random() * 5,
    });
  }

  console.log("Finished Generating `default-reviews`");
  console.log("Start Generating `packed-tokens`...");

  for (let i = 0; i < 1000; i++) {
    await setDoc(doc(firestore, "packed-tokens", `token${i}`), {
      review: {
        bookID: `book${Math.floor(Math.random() * 500)}`,
        totalWords: Math.floor(Math.random() * 100000 + 10000),
        rating: Math.random() * 5,
        reviewID: `review${Math.floor(Math.random() * 500)}`,
      },
      count: Math.floor(Math.random() * 300 + 5),
      positions: new Array(Math.floor(Math.random() * 10 + 1))
        .fill(0)
        .map(() => Math.floor(Math.random() * 300 + 5)),
    });
  }

  console.log("Finished Generating `packed-books`");

  deleteApp(firebaseApp);
  console.log("Done.");
}

async function firestoreGuard() {
  const querySnapshot = await getDocs(collection(firestore, "default-exists"));
  return !querySnapshot.size;
}
