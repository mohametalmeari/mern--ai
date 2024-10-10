import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  email: { type: String, required: true },
  auth: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },

    verificationToken: { type: String, select: false },
    verified: { type: Boolean, required: true, default: false },

    resetToken: { type: String, select: false },
    resetTokenExpires: { type: Date, select: false },
  },
  premiumExpires: { type: Date, required: false },
  freeGenerations: { type: Number, default: 5 },
});

const User = mongoose.model("User", Schema);

export const createUser = async (values) => {
  const user = new User(values);
  return user.save().then((doc) => doc.toObject());
};

export const getUserByEmail = (email) => User.findOne({ email });

export const getUserBySessionToken = (sessionToken) =>
  User.findOne({ "auth.sessionToken": sessionToken });

export const getUserByVerificationToken = async (verificationToken) => {
  const user = User.findOne({ "auth.verificationToken": verificationToken });
  return user;
};

export const getUserByResetToken = (resetToken) =>
  User.findOne({ "auth.resetToken": resetToken });
