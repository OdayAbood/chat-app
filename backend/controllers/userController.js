const User = require("../models/userModel") ;

const bcrypt = require("bcrypt") ;

const jwt = require("jsonwebtoken");

let checkIfExist ;

const createToken = (_id)=>{
    return jwt.sign({_id} , process.env.SECRET_TOKEN_JWT , {expiresIn : "3d"} )
}

const signup = async (req , res )=>{

     let hashedPassword ;

    const {email , password , lastname , firstname } = req.body ;



    checkIfExist = await User.findOne({email});

    if(checkIfExist){
        return res.json({succeed : false , mess : "This email is already in use go and sign in"})
    }
    else {
        const salt = await bcrypt.genSalt(10) ; 
     
        if(password && password.length >= 6){
             hashedPassword = await bcrypt.hash(password , salt)
        }
        const user = {email , lastname , firstname , password : hashedPassword}
        try{
            const newUser = await User.create(user);
            
            res.json({succeed : true , mess : "The user is created" , user : newUser , redirect : "/" })
        }
        catch(error)
        {
            res.status(401).json({succeed:false , error})

        }
    }
}

const signin = async (req , res )=>{

    const {email , password} = req.body ;
    checkIfExist = await User.findOne({email}) ;
 

    if(checkIfExist){
        const match =await bcrypt.compare(password , checkIfExist.password);
        if(match){
            const token = createToken(checkIfExist._id);
            res.cookie("jwt" , token , {httpOnly : true , 
                secure: process.env.NODE_ENV ==="production" ,
                sameSite : "None", 
                maxAge : 1000 * 60 * 60 * 24 * 7});

         
            
            return res.json({succeed : true ,  user: checkIfExist , token: req.cookies.jwt})
        } 
        else{
            return res.json({succeed : false , mess : "Enter a valid password"})
        }
    }
    else {
        return res.json({succeed : false , mess: "This email is not exist go and create an account"})
    }

}
const logOut = async(req,res) =>{

   



     res.cookie("jwt" ,"", { maxAge : 0});

    
    res.status(200).json({succeed : true , mess: "the user log out correctly"}) ;
}

const getUsers = async(req , res)=>{
    const {id} = req.user._id
    try{
        const users = await User.find( ).select("-password");
        if(users){
            res.status(200).json({succeed : true , users , length : users.length});
            // console.log(id)
        }
        else{
            res.status(200).json({succeed : "undefined" , mess: "There is no user yet"})
        }
    }
    catch(err){
        res.status(401).json({succeed : false , err});
    }
}

module.exports = {signup , signin , getUsers , logOut};