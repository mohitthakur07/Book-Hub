const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  author: String,
  price: Number,
  location: String,
  contact: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Book = mongoose.model("book", bookSchema);

module.exports = Book;
