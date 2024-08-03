import { CreateUser } from "#/@types/user";
import { create } from "#/controllers/user";
import { validate } from "#/middleware/validator";
import User from "#/models/user";
import { CreateUserSchema } from "#/utils/validationSchema";
import { error } from "console";
import { Router } from "express";

const router = Router();

router.post("/create", validate(CreateUserSchema), create);

export default router;
