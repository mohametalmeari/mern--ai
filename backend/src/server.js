require("dotenv").config();

import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(cookieParser());
app.use(compression());
app.use(cors({ credentials: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
