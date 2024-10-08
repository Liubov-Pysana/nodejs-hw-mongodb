import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('personal', 'home').required(),
});
