import {
  CodeGenerator,
  Conversation,
  getCodeGeneratorHistory,
  getConversationHistory,
} from "../controllers/ai";
import { isAuthenticated, isAuthorized } from "../middlewares/auth";
import { hasRequiredFields } from "../middlewares/validation";

export default (router) => {
  router.post(
    "/ai/conversation",
    hasRequiredFields("message"),
    isAuthenticated,
    isAuthorized,
    Conversation
  );
  router.get("/ai/conversation/:id", isAuthenticated, getConversationHistory);
  router.post(
    "/ai/code",
    hasRequiredFields("message"),
    isAuthenticated,
    isAuthorized,
    CodeGenerator
  );
  router.get("/ai/code/:id", isAuthenticated, getCodeGeneratorHistory);

  return router;
};
