import * as yup from "yup";
import { RequestHandler } from "express";

export const validate = (schema: yup.AnySchema): RequestHandler => {
  return async (req, res, next) => {
    if (!req.body) res.status(422).json({ error: "Empty is not accepted" });

    try {
      await schema.validate(req.body, { abortEarly: true });
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        res.status(422).json({ error: error.message });
      }
    }
  };
};
