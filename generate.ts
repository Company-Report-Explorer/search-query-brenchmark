import { deleteApp } from "firebase/app";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import { firebaseApp, firestore } from "./firebase";
import { booksCollection, tokensCollection } from "./mongo";
import mongoose from "mongoose";

async function generateFirestore() {
  const _guard = await firestoreGuard();
  if (!_guard) {
    console.log("Firestore has already been generated");
    deleteApp(firebaseApp);
    return;
  }

  console.log("Start Generating...");

  for (let i = 0; i < 10000; i++) {
    await setDoc(doc(firestore, "default-tokens", `tokens${i}`), {
      bookID: Math.floor(Math.random() * 500),
      count: Math.floor(Math.random() * 300 + 5),
      positions: new Array(Math.floor(Math.random() * 10 + 1))
        .fill(0)
        .map(() => Math.floor(Math.random() * 300 + 5)),
    });
  }

  for (let i = 0; i < 500; i++) {
    await setDoc(doc(firestore, "default-books", `book${i}`), {
      totalWords: Math.floor(Math.random() * 100000 + 10000),
      rating: Math.random() * 5,
    });
  }

  deleteApp(firebaseApp);
}

async function firestoreGuard() {
  const querySnapshot = await getDocs(collection(firestore, "default-exists"));
  return !querySnapshot.size;
}

async function generateMongo() {
  console.log("Start Generating `tokens`...");

  for (let i = 0; i < 100000; i++) {
    const t = new tokensCollection({
      _id: `token${i}`,
      bookID: Math.floor(Math.random() * 500),
      count: Math.floor(Math.random() * 300 + 5),
      positions: new Array(Math.floor(Math.random() * 10 + 1))
        .fill(0)
        .map(() => Math.floor(Math.random() * 300 + 5)),
    });

    await t.save();
  }

  console.log("Finished Generating `tokens`");
  console.log("Start Generating `books`...");

  for (let i = 0; i < 500; i++) {
    const b = new booksCollection({
      _id: `book${i}`,
      totalWords: Math.floor(Math.random() * 100000 + 10000),
      rating: Math.random() * 5,
    });

    await b.save();
  }

  console.log("Finished Generating `books`");
  mongoose.connection.close();
  console.log("Done.");
}

if (process.argv.length > 2) {
  const db = process.argv[2];
  if (db.toLowerCase() === "mongo") {
    deleteApp(firebaseApp);
    generateMongo();
  } else if (
    db.toLowerCase() === "firebase" ||
    db.toLowerCase() === "firestore"
  ) {
    mongoose.connection.close();
    generateFirestore();
  } else {
    deleteApp(firebaseApp);
    mongoose.connection.close();
    console.log("Command does not exist");
  }
} else {
  deleteApp(firebaseApp);
  generateMongo();
}
