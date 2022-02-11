import {
  newPackedCollection,
  newPackedDupCollection,
} from "../connections/mongo";
import mongoose from "mongoose";

interface Review {
  reviewID: string;
  like: number;
  text: string;
  rating: number;
  noOfComments: number;
  count: number;
  length: number;
  positions: number[];
}

interface Book {
  bookID: string;
  title: string;
  author: string;
  isbn: string;
  rating: number;
  imageUrl: string;
  url: string;
  pub: number;
  desc: string;
  reviewCount: number;
}

export async function generateNewMongo() {
  const tokenSize = 3;
  const dup = 4000;

  console.log("Start Generating `new-packed`...");

  for (let i = 0; i < tokenSize; i++) {
    const t = new newPackedCollection({
      _id: `token${i}`,
      reviews: new Array(dup).fill({}).map(() => ({
        review: generateReview(),
        book: generateBook(),
      })),
    });

    await t.save();
  }

  console.log("Finished Generating `new-packed`");
  // console.log("Start Generating `new-packed-dup`...");

  // for (let i = 0; i < tokenSize; i++) {
  //   for (let j = 0; j < dup; j++) {
  //     const t = new newPackedDupCollection({
  //       token: `token${i}`,
  //       review: generateReview(),
  //       book: generateBook(),
  //     });

  //     await t.save();
  //   }
  // }

  // console.log("Finished Generating `new-packed-dup`");

  mongoose.connection.close();
  console.log("Done.");
}

function generateReview(): Review {
  return {
    reviewID: `review${Math.floor(Math.random() * 100000)}`,
    like: Math.floor(Math.random() * 1000),
    text:
      "Nostrud duis voluptate minim ea cillum incididunt irure eiusmod magna et est. Sit irure do reprehenderit id officia nulla amet dolor nisi eiusmod et ut ex. Dolor dolore exercitation enim consectetur consequat do nisi amet eiusmod enim ex proident cupidatat laboris. Fugiat eiusmod ipsum eu consequat eu irure laborum exercitation est. Excepteur cupidatat magna qui laboris ut cupidatat ullamco consectetur mollit irure aliquip aute labore.",
    rating: Math.random() * 5,
    noOfComments: Math.floor(Math.random() * 300),
    count: Math.floor(Math.random() * 100 + 5),
    length: Math.floor(Math.random() * 300 + 5),
    positions: new Array(300)
      .fill(0)
      .map(() => Math.floor(Math.random() * 300 + 5)),
  };
}

function generateBook(): Book {
  return {
    bookID: `book${Math.floor(Math.random() * 1000)}`,
    title:
      "Non in pariatur velit cupidatat excepteur veniam ex minim labore esse.",
    author: "Id exercitation et nisi eu ea adipisicing elit.",
    isbn:
      "Reprehenderit veniam culpa proident deserunt do cillum cupidatat nisi cillum aute laboris.",
    rating: Math.random() * 5,
    imageUrl: "Occaecat cillum laborum est amet.",
    url:
      "Anim incididunt culpa et incididunt pariatur laborum id Lorem reprehenderit excepteur nisi proident tempor.",
    pub: Math.floor(Math.random() * 2023),
    desc:
      "Ad irure sit quis aute. Officia laborum mollit ullamco anim irure anim nostrud. Esse ipsum proident voluptate reprehenderit mollit et in ipsum proident eu officia eu sunt cillum. Duis ullamco enim quis ad magna. Dolor ad elit tempor esse amet voluptate eu in ad occaecat sunt incididunt nulla. Fugiat labore ullamco laboris duis occaecat sunt incididunt id deserunt irure excepteur minim nulla sunt. Est anim deserunt incididunt et laborum consequat.",
    reviewCount: Math.floor(Math.random() * 1000),
  };
}
