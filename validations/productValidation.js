import Joi from "joi";

export const productSchema = Joi.object({
    libelle: 
     Joi.string()
     .min(3)
     .max(100)
     .required(),
    price:
     Joi.number()
     .positive()
     .required(),
    CategoryId:
    Joi.number()
     .integer()
     .positive()
     .required()
});