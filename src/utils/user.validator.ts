import Joi from "joi";

export class UserValidator {
  static loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
  });

  static registerSchema = Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    phone: Joi.string().min(10).max(50).required(),
  });
}
