require("dotenv").config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationMail = async (email, token) => {
  try {
    const options = {
      from: {
        name: "Genius AI",
        address: process.env.EMAIL,
      },
      to: [email],
      subject: "Verification",
      html: `<a href="${process.env.FRONTEND_URL}/verify/${token}">Verify your email</a>`,
    };

    await transporter.sendMail(options);
  } catch (error) {
    console.error(error);
  }
};

export const sendResetPasswordMail = async (email, token) => {
  try {
    const options = {
      from: {
        name: "Genius AI",
        address: process.env.EMAIL,
      },
      to: [email],
      subject: "Reset Password",
      html: `<a href="${process.env.FRONTEND_URL}/reset-password/${token}">Reset your password</a>`,
    };

    await transporter.sendMail(options);
  } catch (error) {
    console.error(error);
  }
};
