const Joi = require("joi");

exports.validateCar = (_reqBody) => {
    let schemaJoi = Joi.object({
        company: Joi.string().min(2).max(999).required(),
       model: Joi.string().min(2).max(99999).required(),
       year: Joi.number().min(2).max(3000).required(),
      category: Joi.string().min(1).max(20000).required(),
        price: Joi.number().min(4).max(9999999).required(),
        color: Joi.string().min(2).max(9999).required(),
       info: Joi.string().min(2).max(9999).required(),
       img_url: Joi.string().min(2).max(999999).required(),
        
    })
    return schemaJoi.validate(_reqBody);
}