import {
  createUser,
  getUserByEmail,
  getUserByResetToken,
  getUserByVerificationToken,
} from "../db/users";
import { hash, random, token } from "../helpers/auth";
import {
  sendMail,
  sendResetPasswordMail,
  sendVerificationMail,
} from "../helpers/mails";

export const Register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return res.status(400).json({ error: "Passwords do not match" });

    const existingEmail = await getUserByEmail(email);
    if (existingEmail)
      return res.status(400).json({ error: "Email already exists" });

    const salt = random();
    const verificationToken = token();

    await createUser({
      email,
      auth: { salt, password: hash(salt, password), verificationToken },
    });

    await sendVerificationMail(email, verificationToken);

    return res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

export const ActivateAccount = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await getUserByVerificationToken(token);
    if (!user) return res.status(404).json({ error: "Invalid token" });

    user.auth.verified = true;
    user.auth.verificationToken = undefined;

    await user.save();

    return res.status(200).json({ message: "Account activated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email).select(
      "+auth.salt +auth.password +auth.verified"
    );
    if (!user) return res.status(404).json({ error: "Invalid email" });

    if (!user.auth.verified)
      return res.status(400).json({ error: "Account not verified" });

    const expectedHash = hash(user.auth.salt, password);
    if (user.auth.password !== expectedHash)
      return res.status(400).json({ error: "Invalid password" });

    const salt = random();
    user.auth.sessionToken = hash(salt, user._id.toString());

    await user.save();

    res.cookie("AUTH", user.auth.sessionToken, {
      domain: process.env.DOMAIN || "localhost",
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ message: "Logged in" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

export const Logout = async (req, res) => {
  try {
    const user = req.identity;

    res.clearCookie("AUTH");

    if (user) {
      user.auth.sessionToken = undefined;
      await user.save();

      return res.status(200).json({ message: "Logged out" });
    }

    return res.status(200).json({ message: "Session not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

export const UpdatePassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, currentPassword } = req.body;

    if (newPassword !== confirmPassword)
      return res.status(400).json({ error: "Passwords do not match" });

    if (newPassword === currentPassword)
      return res.status(400).json({ error: "New password cannot be the same" });

    const user = await getUserByEmail(req.identity.email).select(
      "+auth.salt +auth.password"
    );

    const expectedHash = hash(user.auth.salt, currentPassword);
    if (user.auth.password !== expectedHash)
      return res.status(400).json({ error: "Invalid password" });

    const salt = random();

    user.auth.salt = salt;
    user.auth.password = hash(salt, newPassword);

    await user.save();

    return res.status(200).json({ message: "Password updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

export const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await getUserByEmail(email).select(
      "+auth.resetToken +auth.resetTokenExpires"
    );
    if (!user) return res.status(404).json({ error: "Invalid email" });

    const resetToken = token();
    user.auth.resetToken = resetToken;
    user.auth.resetTokenExpires = new Date(Date.now() + 3600000);

    await user.save();

    await sendResetPasswordMail(email, resetToken);

    return res.status(200).json({ message: "Reset link sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

export const ResetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword)
      return res.status(400).json({ error: "Passwords do not match" });

    const user = await getUserByResetToken(token).select(
      "+auth.salt +auth.password +auth.resetToken +auth.resetTokenExpires"
    );

    if (!user) return res.status(404).json({ error: "Invalid link" });

    if (user.auth.resetTokenExpires < new Date())
      return res.status(400).json({ error: "Reset link expired" });

    const salt = random();

    user.auth.salt = salt;
    user.auth.password = hash(salt, newPassword);
    user.auth.resetToken = undefined;
    user.auth.resetTokenExpires = undefined;

    await user.save();

    return res.status(200).json({ message: "Password reset" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

export const IsLoggedIn = async (req, res) => {
  try {
    const user = req.identity;

    if (user) return res.status(200).json({ in: true });

    return res.status(200).json({ in: false });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

export const FreeTier = async (req, res) => {
  try {
    const user = req.identity;

    const isPremium = user.premiumExpires && user.premiumExpires > new Date();

    const freeGenerations = !isPremium ? user.freeGenerations : undefined;

    return res.status(200).json({ isPremium, freeGenerations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
};
