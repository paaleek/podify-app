import nodemailer from "nodemailer";
import path from "path";

import {
  MAILTRAP_PASS,
  MAILTRAP_USER,
  VERIFICATON_EMAIL,
} from "#/utils/variables";
import EmailVerificationToken from "#/models/emailVerificationToken";
import { generateTemplate } from "#/mail/template";

const generetaMailTransporter = () => {
  return nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS,
    },
  });
};

interface Profile {
  name: string;
  email: string;
  userId: string;
}

export const sendVerificationMail = async (token: string, profile: Profile) => {
  const transport = generetaMailTransporter();
  const { name, email, userId } = profile;

  const welcomeMessage = `Hi ${name} welcome to Podify! There are so much
  thing that we do for verified users. Use the given OTP to verify your email.`;

  transport.sendMail({
    to: email,
    from: VERIFICATON_EMAIL,
    subject: "Welcome message",
    html: generateTemplate({
      title: "Welcome to Podify",
      message: welcomeMessage,
      logo: "cid:logo",
      banner: "cid:welcome",
      link: "#",
      btnTitle: token,
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../mail/logo.png"),
        cid: "logo",
      },
      {
        filename: "welcome.png",
        path: path.join(__dirname, "../mail/welcome.png"),
        cid: "welcome",
      },
    ],
  });
};
