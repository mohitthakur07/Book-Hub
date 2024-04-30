const mongoose = require("mongoose");
const initData = require("./smapledata.js");
const Book = require("../models/books.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/bookhub");
  }
  
  main()
    .then((res) => console.log("db connect "))
    .catch((err) => console.log(err));

    
    const initDB = async()=>{
        await Book.deleteMany({});
        initData.data = initData.data.map((obj)=>({...obj, owner:"6620166853d063258852f5b3"}));
        Book.insertMany(initData.data);
        console.log("data is saved");
    }

    initDB();