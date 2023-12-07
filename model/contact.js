const mongoose = require("mongoose")
const contactSchema = new mongoose.Schema({
    name: {
        type : String, 
        required :true 
    },
    email : {
        type : String,
        required: true 
    },
    phone : {
        type: String,
        required: true
    },
    created: {
        type : Date ,
        required : true,
        default : Date.now
    }
})

module.exports = mongoose.model("contact" , contactSchema)