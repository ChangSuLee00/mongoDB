import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import connectDatabase from "./config/database.js";
import routers from "./routers.js";

dotenv.config();
connectDatabase();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.static("/"));
app.use(routers);

export default app;
