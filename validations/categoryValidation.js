import Joi from "joi";
export const categorySchema = Joi.object({
    title: 
     Joi.string()
        .min(3)
        .max(100)
        .required()
});