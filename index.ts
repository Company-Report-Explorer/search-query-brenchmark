import mongoose from "mongoose";
import { queryFirestore } from "./queries/queryFirebase";
import { queryMongo } from "./queries/queryMongo";

if (process.argv.length > 2) {
  let size = 1000;
  if (process.argv.length == 4) size = Number(process.argv[3]);

  const db = process.argv[2];
  if (db.toLowerCase() === "mongo") queryMongo(size);
  else if (
    db.toLowerCase() === "firebase" ||
    db.toLowerCase() === "firestore"
  ) {
    mongoose.connection.close();
    queryFirestore();
  } else console.log("Command does not exist");
} else queryMongo();
