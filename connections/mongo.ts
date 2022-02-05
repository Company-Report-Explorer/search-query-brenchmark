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

export {
  defaultTokensCollection,
  defaultBooksCollection,
  packedTokensCollection,
};
