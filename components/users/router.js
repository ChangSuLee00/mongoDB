import express from "express";
import Controller from "./controller.js";

const router = express.Router();
const controller = new Controller();

router.get("/", controller.getUser);

router.post("/", controller.createUser);

export default router;
