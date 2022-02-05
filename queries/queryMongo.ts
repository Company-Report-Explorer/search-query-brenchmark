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
  console.time("Default MongoDB Query Time:");

  let bookIDs: string[] = [];
  for (let i = 0; i < size; i++)
    bookIDs.push((await defaultTokensCollection.findById(`token${i}`)).bookID);
  bookIDs = Array.from(new Set(bookIDs));
  // console.log(bookIDs);
  const books = [];
  for (let i = 0; i < bookIDs.length; i++)
    books.push(await defaultBooksCollection.findById(bookIDs[i]));
  // console.log(books);
  console.timeEnd("Default MongoDB Query Time:");
}

async function queryPackedMongo(size: number) {
  console.time("Packed MongoDB Query Time:");

  let bookIDs: string[] = [];
  for (let i = 0; i < size; i++)
    bookIDs.push((await packedTokensCollection.findById(`token${i}`)).bookID);

  console.timeEnd("Packed MongoDB Query Time:");
}
