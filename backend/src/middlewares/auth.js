import { getUserBySessionToken } from "../db/users";

export const isAuthenticate = async (req, res, next) => {
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

export const isAuthorized = (req, res, next) => {
  try {
    const user = req.identity;
    if (user.premiumExpires < Date.now() && user.freeGenerations < 1) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
};
