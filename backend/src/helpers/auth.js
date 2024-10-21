require("dotenv").config();

import crypto from "crypto";

export const random = () => crypto.randomBytes(128).toString("base64");

export const token = () => crypto.randomBytes(64).toString("hex");

export const hash = (salt, password) =>
  crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(process.env.SECRET)
    .digest("hex");
