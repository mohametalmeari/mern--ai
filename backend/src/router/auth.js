import {
  Register,
  Login,
  Logout,
  UpdatePassword,
  ActivateAccount,
  ForgotPassword,
  ResetPassword,
  IsLoggedIn,
  FreeTier,
} from "../controllers/auth";
import { attachIdentity, isAuthenticated } from "../middlewares/auth";
import { hasRequiredFields, isValidPassword } from "../middlewares/validation";

export default (router) => {
  router.post(
    "/auth/register",
    hasRequiredFields("email", "password", "confirmPassword"),
    isValidPassword("password"),
    Register
  );
  router.get("/auth/activate-account/:token", ActivateAccount);
  router.post("/auth/login", hasRequiredFields("email", "password"), Login);
  router.delete("/auth/logout", attachIdentity, Logout);
  router.patch(
    "/auth/update-password",
    hasRequiredFields("newPassword", "confirmPassword", "currentPassword"),
    isValidPassword("newPassword"),
    isAuthenticated,
    UpdatePassword
  );
  router.post(
    "/auth/forgot-password",
    hasRequiredFields("email"),
    ForgotPassword
  );
  router.patch(
    "/auth/reset-password",
    hasRequiredFields("token", "newPassword", "confirmPassword"),
    isValidPassword("newPassword"),
    ResetPassword
  );
  router.get("/auth/is-logged-in", attachIdentity, IsLoggedIn);
  router.get("/auth/free-tier", isAuthenticated, FreeTier);
};
