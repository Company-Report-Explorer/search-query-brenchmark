import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose.connect(`${process.env.MONGO_DB_URL}/default`);

const tokenSchema = new mongoose.Schema({
  _id: String,
  bookID: String,
  count: Number,
  positions: [Number],
});

const bookSchema = new mongoose.Schema({
  _id: String,
  totalWords: Number,
  rating: Number,
});

const tokensCollection = mongoose.model("tokens", tokenSchema);
const booksCollection = mongoose.model("books", bookSchema);

export { tokensCollection, booksCollection };
