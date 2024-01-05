import Joi from "joi";

export class Validator {
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

  static foodSchema = Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    restaurant: Joi.string(),
  });

  static roomSchema = Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string().min(3).max(30).required(),
    code: Joi.string().min(6).max(30).required(),
  });

  static orderSchema = Joi.object({
    id: Joi.string().uuid().required(),
    comment: Joi.string().min(0).max(100),
  });

  static isValidEmail(email: string): Boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static isValidPassword(password: string): Boolean {
    return password.length >= 8;
  }
}
