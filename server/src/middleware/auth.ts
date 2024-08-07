import { RequestHandler } from "express";
import PasswordResetToken from "#/models/passwordResetToken";

export const isValidPasswordResetToken: RequestHandler = async (
  req,
  res,
  next
) => {
  const { token, userId } = req.body;

  const resetToken = await PasswordResetToken.findOne({ owner: userId });
  if (!resetToken)
    return res
      .status(403)
      .json({ message: "Unauthorized access, invalid token!" });

  const match = await resetToken.compareToken(token);
  if (!match)
    return res
      .status(403)
      .json({ message: "Unauthorized access, invalid token!" });

  next();
};
