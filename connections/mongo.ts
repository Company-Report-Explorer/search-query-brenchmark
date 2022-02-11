import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose.connect(`${process.env.MONGO_DB_URL}`);

const defaultTokenSchema = new mongoose.Schema({
  _id: String,
  bookID: String,
  count: Number,
  positions: [Number],
});

const defaultBookSchema = new mongoose.Schema({
  _id: String,
  totalWords: Number,
  rating: Number,
});

const packedTokenSchema = new mongoose.Schema({
  _id: String,
  book: {
    bookID: String,
    totalWords: Number,
    rating: Number,
  },
  count: Number,
  positions: [Number],
});

const newPackedSchema = new mongoose.Schema({
  _id: String,
  reviews: [
    {
      review: {
        reviewID: String,
        like: Number,
        text: String,
        rating: Number,
        noOfComments: Number,
        count: Number,
        length: Number,
        positions: [Number],
      },
      book: {
        bookID: String,
        title: String,
        author: String,
        isbn: String,
        rating: Number,
        imageUrl: String,
        url: String,
        pub: Number,
        desc: String,
        reviewCount: Number,
      },
    },
  ],
});

const newPackedDupSchema = new mongoose.Schema({
  token: String,
  review: {
    reviewID: String,
    like: Number,
    text: String,
    rating: Number,
    noOfComments: Number,
    count: Number,
    length: Number,
    positions: [Number],
  },
  book: {
    bookID: String,
    title: String,
    author: String,
    isbn: String,
    rating: Number,
    imageUrl: String,
    url: String,
    pub: Number,
    desc: String,
    reviewCount: Number,
  },
});

const defaultTokensCollection = mongoose.model(
  "default-tokens",
  defaultTokenSchema
);
const defaultBooksCollection = mongoose.model(
  "default-books",
  defaultBookSchema
);
const packedTokensCollection = mongoose.model(
  "packed-tokens",
  packedTokenSchema
);
const newPackedCollection = mongoose.model("new-packed", newPackedSchema);
const newPackedDupCollection = mongoose.model(
  "new-packed-dup",
  newPackedDupSchema
);

export {
  defaultTokensCollection,
  defaultBooksCollection,
  packedTokensCollection,
  newPackedCollection,
  newPackedDupCollection,
};
