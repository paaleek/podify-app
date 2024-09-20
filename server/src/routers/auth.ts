import {
  create,
  verifyEmail,
  sendReverificationTokenEmail,
  generateForgetPasswordLink,
  grantValid,
  updatePassword,
  signIn,
} from "#/controllers/user";
import { isValidPasswordResetToken } from "#/middleware/auth";
import { validate } from "#/middleware/validator";
import {
  CreateUserSchema,
  SignInValidationSchema,
  TokenAndIdValidation,
  UpdatePasswordSchema,
} from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();

router.post("/create", validate(CreateUserSchema), create);
router.post("/verify-email", validate(TokenAndIdValidation), verifyEmail);
router.post("/re-verify-email", sendReverificationTokenEmail);
router.post("/forget-password", generateForgetPasswordLink);
router.post(
  "/verify-pass-reset-token",
  validate(TokenAndIdValidation),
  isValidPasswordResetToken,
  grantValid
);
router.post(
  "/update-password",
  validate(UpdatePasswordSchema),
  isValidPasswordResetToken,
  updatePassword
);
router.post("/sign-in", validate(SignInValidationSchema), signIn);

export default router;
