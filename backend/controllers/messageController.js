const Message = require("../models/messageModel");

const {io ,  getRecieverSocketId} = require("../ioServer");

const getMessages = async (req , res) =>{
    const selectedId = req.params.id ; 
    const currendId = req.user._id;
    try{
        const allMessages = await Message.find({
            $or: [
                {sender : currendId , reciever : selectedId},
                {sender : selectedId , reciever : currendId}
            ]
        });
            //  console.log(allMessages);
             res.status(200).json({succeed : true , allMessages , selectedId , currendId});
    }
    catch(err){
        console.log(err);
        res.status(401).json({succeed : false , err});
    }
}
const sendMessage = async (req , res)=>{
    const {reciever} = req.body ;
    const message = req.body ;
    try{
        const newMessage = await Message.create(message) ;
        res.status(200).json({succeed : true , newMessage});
        console.log("The message is : " , message)
        const recieverSocketId =  getRecieverSocketId(reciever);
        io.to(recieverSocketId).emit("theSendItMessage" , message);
        io.on("sendMessage",(message)=>{
            console.log("From the real time")
            console.log(message);
        })
    }
    catch(err){
        res.status(401).json({succeed : false , err});
    }
}
const deleteMessage = async (req , res) =>{
    const id = req.params.id ; 
    try{
        const message = await Message.findByIdAndDelete({_id : id});
        console.log(message);
        res.status(200).json({succeed : true , message})
        io.emit("deleteMessage",(message));
    }
    catch(err){
        res.status(401).json({succeed : false , err});
    }
}
const updateMessage = async (req , res) =>{
    const id = req.params.id ;

    // console.log("Path : " , req.path , "Id : " , id , "Method : " , req.method)

    const {messageUpdating } = req.body ;

    try{
        const message = await Message.findByIdAndUpdate({_id : id},{message : messageUpdating} , {new : true})
        // console.log(message)
        res.status(200).json({succeed : true , message});
        io.emit("updateMessage",message)
    }
    catch(err){
        res.status(401).json({succeed : false , err})
}
}
module.exports = {sendMessage , deleteMessage , updateMessage , getMessages}

