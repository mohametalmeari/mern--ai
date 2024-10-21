require("dotenv").config();

import express, { Router } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

import router from "./router";
import { Webhook } from "./controllers/stripe";

const app = express();

app.use(cookieParser());
app.use(compression());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  "/api/webhook/",
  express.text({ type: "application/json" }),
  Router().post("/", Webhook)
);

app.use(express.json());

app.use("/api/", router());

mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.listen(4000, () => {
  console.log(`Server is running on ${process.env.FRONTEND_URL}`);
});
