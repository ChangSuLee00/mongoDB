const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { User } = require("./models/User");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const server = async (req, res) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    app.use(express.json());

    app.get("/user", async (req, res) => {
      try {
        const users = await User.find({});
        return res.send({ users: users });
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
      }
    });

    app.get("/user/:userId", async (req, res) => {
      const { userId } = req.params;
      try {
        const user = await User.findOne({ userId });
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
      }
    });

    app.post("/user", async (req, res) => {
      try {
        let { username, name } = req.body;

        if (!username)
          return res.status(400).send({ error: "username is required" });

        if (!name || !name.first || !name.last)
          return res
            .status(400)
            .send({ error: "first and last names are required" });

        const user = new User(req.body);
        await user.save();
        return res.sned({ user });
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
      }
    });

    app.listen(3000, function () {
      console.log("server listning on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

server();
