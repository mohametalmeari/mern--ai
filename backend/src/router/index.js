import { Router } from "express";

import auth from "./auth";
import ai from "./ai";

const router = Router();

export default () => {
  auth(router);
  ai(router);

  return router;
};
