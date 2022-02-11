import {
  defaultTokensCollection,
  defaultBooksCollection,
  packedTokensCollection,
} from "../connections/mongo";
import mongoose from "mongoose";

export async function generateMongo() {
  console.log("Start Generating `default-tokens`...");

  for (let i = 0; i < 1000; i++) {
    const t = new defaultTokensCollection({
      _id: `token${i}`,
      bookID: `review${Math.floor(Math.random() * 500)}`,
      count: Math.floor(Math.random() * 300 + 5),
      positions: new Array(Math.floor(Math.random() * 10 + 1))
        .fill(0)
        .map(() => Math.floor(Math.random() * 300 + 5)),
    });

    await t.save();
  }

  console.log("Finished Generating `default-tokens`");
  console.log("Start Generating `default-reviews`...");

  for (let i = 0; i < 500; i++) {
    const b = new defaultBooksCollection({
      _id: `review${i}`,
      totalWords: Math.floor(Math.random() * 100000 + 10000),
      rating: Math.random() * 5,
    });

    await b.save();
  }

  console.log("Finished Generating `default-reviews`");
  console.log("Start Generating `packed-tokens`...");

  for (let i = 0; i < 1000; i++) {
    const t = new packedTokensCollection({
      _id: `token${i}`,
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

    await t.save();
  }

  console.log("Finished Generating `packed-books`");

  mongoose.connection.close();
  console.log("Done.");
}
