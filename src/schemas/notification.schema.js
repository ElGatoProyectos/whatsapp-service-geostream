import Joi from "joi";

export const notificationSchema = Joi.object({
  phone: Joi.string().required().min(9),
  message: Joi.string().required(),
});
