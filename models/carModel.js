const mongoose = require('mongoose');

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

