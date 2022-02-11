import { newPackedCollection } from "./connections/mongo";
import fs from "fs";
import mongoose from "mongoose";

newPackedCollection.findById(`token0`).then((doc) => {
  fs.writeFile("./document.txt", JSON.stringify(doc), (err) => {
    if (err) throw err;
  });

  mongoose.connection.close();
});
