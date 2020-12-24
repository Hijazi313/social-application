const {model, Schema, Types} = require("mongoose");

const commentSchema = require('./commentSchema')
const postSchema = new Schema({
    title: {
        type:String,
        required:[true, "User Name is Required"]
    },
    body: {
        type:String,
        required:[true, "User password is Required"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:"users",
        required:[true, "User email is Required"]
    },
    likes:[
        {
            user:{type: Schema.Types.ObjectId , ref:"User", },
        }
    ],


}, {timestamps:true})

module.exports = model('Post', postSchema)
