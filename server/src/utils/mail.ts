import nodemailer from "nodemailer";
import path from "path";

import {
  MAILTRAP_PASS,
  MAILTRAP_USER,
  SIGN_IN_URL,
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

interface Options {
  email: string;
  link: string;
}

export const sendForgetPasswordLink = async (options: Options) => {
  const transport = generetaMailTransporter();
  const { email, link } = options;

  const message = `We just received a request that you forgot your password. No problem you can use the link below and create brand new password.`;

  transport.sendMail({
    to: email,
    from: VERIFICATON_EMAIL,
    subject: "Reset password link",
    html: generateTemplate({
      title: "Forget Password",
      message: message,
      logo: "cid:logo",
      banner: "cid:forget_password",
      link: link,
      btnTitle: "Reset Password",
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../mail/logo.png"),
        cid: "logo",
      },
      {
        filename: "forget_password.png",
        path: path.join(__dirname, "../mail/forget_password.png"),
        cid: "forget_password",
      },
    ],
  });
};

export const sendPassResetSuccessEmail = async (
  name: string,
  email: string
) => {
  const transport = generetaMailTransporter();

  const message = `Dear ${name} we just updated your password you can sign in with your new password`;

  transport.sendMail({
    to: email,
    from: VERIFICATON_EMAIL,
    subject: "Password reset Successfully",
    html: generateTemplate({
      title: "Password reset Successfully",
      message: message,
      logo: "cid:logo",
      banner: "cid:forget_password",
      link: SIGN_IN_URL,
      btnTitle: "Log in",
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../mail/logo.png"),
        cid: "logo",
      },
      {
        filename: "forget_password.png",
        path: path.join(__dirname, "../mail/forget_password.png"),
        cid: "forget_password",
      },
    ],
  });
};
