const {Server} = require("socket.io");

const http = require("http");

const express = require("express");

const app = express();

const server = http.createServer(app);

const io = new Server (server , {
    cors : {
        origin : ["http://localhost:3000"]
    }
});
const userSocketMap = {};
io.on("connection" , (socket)=>{
    console.log("The user is connected" , socket.id);

    const userId = socket.handshake.query.userId ;
    
    console.log(userId);

    if(userId) userSocketMap[userId] = socket.id ;

    io.emit("getOnlineUsers" , Object.keys(userSocketMap));
    

    socket.on("disconnect" , ()=>{
        console.log("The user is disconnected" , socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers" , Object.keys(userSocketMap));

    })
})
const getRecieverSocketId = (userId)=>{
    return userSocketMap[userId] ;
}

module.exports = {io , app, server ,  getRecieverSocketId}