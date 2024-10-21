import {
  CodeGenerator,
  Conversation,
  getCodeGeneratorHistory,
  getConversationHistory,
  ImageGenerator,
  MusicGenerator,
  VideoGenerator,
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
  router.post(
    "/ai/image",
    hasRequiredFields("prompt"),
    isAuthenticated,
    isAuthorized,
    ImageGenerator
  );
  router.post(
    "/ai/video",
    hasRequiredFields("prompt"),
    isAuthenticated,
    isAuthorized,
    VideoGenerator
  );
  router.post(
    "/ai/music",
    hasRequiredFields("prompt"),
    isAuthenticated,
    isAuthorized,
    MusicGenerator
  );

  return router;
};
