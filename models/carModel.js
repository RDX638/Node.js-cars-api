const mongoose = require('mongoose');
const Joi = require('joi')

const carsSchema = new mongoose.Schema({
    company: String,
    model: String,
    year: Number,
    category: String,
    price: Number,
    color: String,
    info: String,
    img_url:String,
    user_id: String,
    date_created: {
        type: Date, default: Date.now()
    },
    category_id: {
        type: String, 
        default: "1"
    }
    
})

exports.CarModel = mongoose.model("cars", carsSchema);

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
