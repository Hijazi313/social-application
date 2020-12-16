const {model, Schema} = require("mongoose");
const {default:{isEmail}} = require("validator")

const userSchema = new Schema({
    name: {
        type:String,
        required:[true, "User Name is Required"]
    },
    password: {
        type:String,
        required:[true, "User password is Required"]
    },
    email: {
        type:String,
        unique:[true, "Email Must be Unique"],
        required:[true, "User email is Required"],
        lowercase:true,
        validate: (value)=>{
            const email = isEmail(value);
            if(!email) throw new Error(`${value} is not a valid email address`)
        }
    },

}, {timestamps:true})

module.exports = model('User', userSchema)
