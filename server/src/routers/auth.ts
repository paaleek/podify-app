import {
  create,
  verifyEmail,
  sendReverificationTokenEmail,
} from "#/controllers/user";
import { validate } from "#/middleware/validator";
import {
  CreateUserSchema,
  EmailVerificationBody,
} from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();

router.post("/create", validate(CreateUserSchema), create);
router.post("/verify-email", validate(EmailVerificationBody), verifyEmail);
router.post("/re-verify-email", sendReverificationTokenEmail);

export default router;
