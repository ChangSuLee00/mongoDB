import express from "express";

const routers = express.Router();

routers.use("/", (req, res) => {
  res.send("Hello world!");
});

export default routers;
