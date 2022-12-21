const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    gender:{
        type: String
    },
    phone: {
        type: String
    },
    create_date : {
        type: Date,
        default: Date.now
    }
});

const Contact = module.exports = mongoose.model('contact', contactSchema);


module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}