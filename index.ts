import { firebaseApp, firestore } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { deleteApp } from "firebase/app";
import { booksCollection, tokensCollection } from "./mongo";
import mongoose from "mongoose";

async function queryFirestore() {
  console.time("Firestore Query Time:");

  await getDoc(doc(firestore, "default-tokens", "able"));
  await getDoc(doc(firestore, "default-tokens", "ability"));
  await getDoc(doc(firestore, "default-tokens", "about"));

  console.timeEnd("Firestore Query Time:");

  deleteApp(firebaseApp);
}

async function queryMongo() {
  console.time("MongoDB Query Time:");

  await tokensCollection.findById("token1");
  await tokensCollection.findById("token2");
  await tokensCollection.findById("token3");

  console.timeEnd("MongoDB Query Time:");

  mongoose.connection.close();
}

if (process.argv.length > 2) {
  const db = process.argv[2];
  if (db.toLowerCase() === "mongo") {
    deleteApp(firebaseApp);
    queryMongo();
  } else if (
    db.toLowerCase() === "firebase" ||
    db.toLowerCase() === "firestore"
  ) {
    mongoose.connection.close();
    queryFirestore();
  } else {
    deleteApp(firebaseApp);
    mongoose.connection.close();
    console.log("Command does not exist");
  }
} else {
  deleteApp(firebaseApp);
  queryMongo();
}
