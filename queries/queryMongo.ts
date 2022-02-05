import {
  defaultBooksCollection,
  defaultTokensCollection,
  packedTokensCollection,
} from "../connections/mongo";
import mongoose from "mongoose";

export async function queryMongo(size: number = 1000) {
  await queryDefaultMongo(size);
  await queryPackedMongo(size);
  mongoose.connection.close();
}

async function queryDefaultMongo(size: number) {
  const before = Date.now();

  let bookIDs: string[] = [];
  for (let i = 0; i < size; i++)
    bookIDs.push((await defaultTokensCollection.findById(`token${i}`)).bookID);
  bookIDs = Array.from(new Set(bookIDs));

  const books = [];
  for (let i = 0; i < bookIDs.length; i++)
    books.push(await defaultBooksCollection.findById(bookIDs[i]));

  const after = Date.now();
  console.log("Default MongoDB Query Time:", after - before);
}

async function queryPackedMongo(size: number) {
  const before = Date.now();

  let books: string[] = [];
  for (let i = 0; i < size; i++)
    books.push((await packedTokensCollection.findById(`token${i}`)).book);

  const after = Date.now();
  console.log("Packed MongoDB Query Time:", after - before);
}
