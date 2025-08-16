const jwt = require("jsonwebtoken");

const User = require("../models/userModel");



const authCheck = async (req , res , next)=> {
    const token = req.cookies.jwt ;
    // console.log("Req.cookies.jwt" , req.cookies.jwt);
    // console.log("The token is",token);

    if(!token){
        return res.status(200).json({succeed: false , mess : "THe token is not valid"})
    }
    try{
        const {_id} = jwt.verify(token , process.env.SECRET_TOKEN_JWT);

        // console.log("The current user is",_id)

        const user = await User.findById({_id}).select("-password");
        if(!user){
            return res.status(401).json({succeed : false , mess: "the use is not found"})
        }
        req.user = user ;
        // console.log("The user from authCheck is :" ,user , "The req.user : " , req.user);
        // res.status(200).json({succeed : true , mess: "The user is authurized"});
        next();
    }
    catch(err){
        res.status(200).json({succeed : false , err})

    }

    
}

module.exports = authCheck ; 