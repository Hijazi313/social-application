const {model, Schema} = require("mongoose");
const commentSchema = new Schema({
            body:{type:String, required:true},
            user:{type: Schema.Types.ObjectId ,
                ref:"User",
                required:true},
}, {timestamps:true})

module.exports = commentSchema
