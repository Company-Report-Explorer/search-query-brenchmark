import {
  defaultBooksCollection,
  defaultTokensCollection,
  packedTokensCollection,
} from "../connections/mongo";
import mongoose from "mongoose";

export async function queryMongo(size: number = 5) {
  await queryDefaultMongo(size);
  await queryPackedMongo(size);
  mongoose.connection.close();
}

async function queryDefaultMongo(size: number) {
  const before = Date.now();

  let reviewIDs: string[] = [];
  for (let i = 0; i < size; i++)
    reviewIDs.push(
      (await defaultTokensCollection.findById(`token${i}`)).bookID
    );
  reviewIDs = Array.from(new Set(reviewIDs));

  const reviews = [];
  for (let i = 0; i < reviewIDs.length; i++)
    reviews.push(await defaultBooksCollection.findById(reviewIDs[i]));

  const after = Date.now();
  console.log("Default MongoDB Query Time:", after - before);
}

async function queryPackedMongo(size: number) {
  const before = Date.now();

  let reviews: string[] = [];
  for (let i = 0; i < size; i++)
    reviews.push((await packedTokensCollection.findById(`token${i}`)).book);

  const after = Date.now();
  console.log("Packed MongoDB Query Time:", after - before);
}
