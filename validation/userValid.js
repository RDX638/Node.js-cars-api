const Joi = require("joi");
exports.UserValid = {
    login: _reqBody => {
        let joiSchema = Joi.object({
            email:Joi.string().min(2).max(99).email().required(),
            password:Joi.string().min(3).max(99).required()
          })
        
          return joiSchema.validate(_reqBody);
    },
    user: _reqBody =>{
        let joiSchema = Joi.object({
            name:Joi.string().min(2).max(99).required(),
            email:Joi.string().min(2).max(99).email().required(),
            password:Joi.string().min(3).max(99).required()
          })
        
          return joiSchema.validate(_reqBody);
    }
}