import {
  Register,
  Login,
  Logout,
  UpdatePassword,
  ActivateAccount,
  ForgotPassword,
  ResetPassword,
  IsLoggedIn,
} from "../controllers/auth";
import { attachIdentity, isAuthenticate } from "../middlewares/auth";
import { hasRequiredFields } from "../middlewares/validation";

export default (router) => {
  router.post(
    "/auth/register",
    hasRequiredFields("email", "password", "confirmPassword"),
    Register
  );
  router.get("/auth/activate-account/:token", ActivateAccount);
  router.post("/auth/login", hasRequiredFields("email", "password"), Login);
  router.delete("/auth/logout", attachIdentity, Logout);
  router.patch(
    "/auth/update-password",
    hasRequiredFields("newPassword", "confirmPassword", "currentPassword"),
    isAuthenticate,
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
    ResetPassword
  );
  router.get("/auth/is-logged-in", attachIdentity, IsLoggedIn);
};
