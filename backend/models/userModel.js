const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname : {
        type : String , 
        reqired : [true , "Firstname is required"]
    },
    lastname : {
        type : String , 
        required : [true ,"Firstname is required"]
    },
    email : {
        type : String ,
        required : [true , "Email is required"] , 
        unique : true
    } ,
    password : {
        type : String , 
        required :[ true , "Password is required" ],
        minlength : [6 , "The minmum length of password is 6"]
    }
})
const User = mongoose.model("User" , userSchema)

module.exports = User ;
