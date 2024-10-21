import { Router } from "express";

import auth from "./auth";
import ai from "./ai";
import stripe from "./stripe";

const router = Router();

export default () => {
  auth(router);
  ai(router);
  stripe(router);

  return router;
};
