const jwt = require("jsonwebtoken");

const User = require("../models/userModel");



const requireAuth = async (req , res , next)=> {
    const token = req.cookies.jwt ;

    if(!token){
        return res.status(401).json({succeed: false , mess : "THe token is not valid"})
    }
    try{
        const {_id} = jwt.verify(token , process.env.SECRET_TOKEN_JWT);

        const user = await User.findById({_id}).select("-password");
        if(!user){
            return res.status(401).json({succeed : false , mess: "the use is not found"})
        }
        req.user = user ;
        next();
    }
    catch(err){
        res.status(401).json({succeed : false , err})

    }

    
}

module.exports = requireAuth ; 