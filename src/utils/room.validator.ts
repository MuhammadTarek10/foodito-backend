import Joi from "joi";
export class RoomValidator {
  static roomSchema = Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string().min(3).max(30).required(),
    code: Joi.string().min(6).max(30).required(),
  });
}
