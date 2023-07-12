const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { User } = require("./models/User");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
    app.use(express.json());

    app.post("/user", async (req, res) => {
      try {
        let { username, name } = req.body;

        if (!username)
          return res.status(400).send({ err: "username is required" });

        if (!name || !name.first || !name.last)
          return res
            .status(400)
            .send({ err: "Both first and last names are requied" });

        const user = new User(username, name);
        await user.save();
        return res.send({ user });
      } catch (error) {
        console.log(error);
        return res.status(500).send({ err: error.message });
      }
    });

    app.listen(3000, () => {
      console.log("server listning on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

server();