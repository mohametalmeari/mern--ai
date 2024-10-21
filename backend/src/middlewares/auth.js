import { getSubscriptionByUserId } from "../db/subscriptions";
import { getUserBySessionToken } from "../db/users";

export const isAuthenticated = async (req, res, next) => {
  try {
    const sessionToken = req.cookies.AUTH;
    if (!sessionToken) {
      return res.status(403).json({ error: "Session not found" });
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.status(403).json({ error: "Session expired" });
    }

    req.identity = existingUser;

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

export const attachIdentity = async (req, res, next) => {
  try {
    const sessionToken = req.cookies.AUTH;

    if (!sessionToken) {
      return next();
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    req.identity = existingUser;

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

export const isAuthorized = async (req, res, next) => {
  try {
    const user = req.identity;

    const subscription = await getSubscriptionByUserId(user._id);

    if (
      subscription &&
      subscription.expires < Date.now() &&
      user.freeGenerations < 1
    ) {
      return res.status(403).json({
        error: "Your premium plan has expired. Please renew to continue.",
      });
    }

    if (!subscription && user.freeGenerations < 1) {
      return res.status(403).json({
        error:
          "You have used all your free generations. Please upgrade to continue.",
      });
    }

    req.onFreeTier = user.freeGenerations > 0;

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
};
