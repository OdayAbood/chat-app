const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true ,
    },
    reciever : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    message : {
        type : String,
    },
    picture : {
        type : String,
    },
}, {timestamps: true})

const Message = mongoose.model("message" , messageSchema) ;

module.exports = Message ;