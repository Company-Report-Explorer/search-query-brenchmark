import mongoose from "mongoose";
import { queryFirestore } from "./queries/queryFirebase";
import { queryMongo } from "./queries/queryMongo";

if (process.argv.length > 2) {
  const command = process.argv.join(" ");
  let size = 1000;
  let sizeFlag = command.match(/\s*-{2}size\s*\d+/g);
  if (sizeFlag) {
    size = Number(sizeFlag[0].trim().split(" ")[1]);
  }

  if (command.match(/\s*-{2}mongo\s*/g)) queryMongo(size);
  else if (
    command.match(/\s*-{2}firebase\s*/g) ||
    command.match(/\s*-{2}firestore\s*/g)
  ) {
    mongoose.connection.close();
    queryFirestore();
  } else if (sizeFlag) queryMongo(size);
  else console.log("Command does not exist");
} else queryMongo();
