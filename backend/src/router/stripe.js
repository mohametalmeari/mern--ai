import { Subscribe } from "../controllers/stripe";
import { isAuthenticated } from "../middlewares/auth";

export default (router) => {
  router.get("/subscribe", isAuthenticated, Subscribe);
};
