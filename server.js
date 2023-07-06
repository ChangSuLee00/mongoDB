const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    app.use(express.json());

    app.get("/user", function (req, res) {
      return res.send("hello world");
    });

    app.listen(3000, function () {
      console.log("server listning on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

server();
