import { deleteApp } from "firebase/app";
import { firebaseApp } from "../connections/firebase";
import { generateMongo } from "../generate/generateMongo";
import { generateNewMongo } from "../generate/generateNewMongo";
import { generateFirestore } from "../generate/generateFirestore";
import mongoose from "mongoose";

if (process.argv.length > 2) {
  const command = process.argv.join(" ");
  if (command.match(/\s*-{2}mongo\s*/g)) {
    deleteApp(firebaseApp);
    generateMongo();
  } else if (command.match(/\s*-{2}new-mongo\s*/g)) {
    deleteApp(firebaseApp);
    generateNewMongo();
  } else if (
    command.match(/\s*-{2}firebase\s*/g) ||
    command.match(/\s*-{2}firestore\s*/g)
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
  generateNewMongo();
}
