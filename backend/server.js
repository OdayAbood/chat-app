const userRoute = require("./routes/user_route");

const express = require("express");

const path = require("path");

const messageRoute = require("./routes/message_route");

const authCheck = require ("./midlewares/checkAuth");

const mongoose = require("mongoose");

const cors = require("cors")

const cookieParser = require("cookie-parser");

const {io , app , server} = require("./ioServer");


const dotenv = require("dotenv");

dotenv.config();

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({extended : true}))

app.use(cors({
    origin : 'http://localhost:3000',
     credentials : true
}));

app.get("/" , authCheck ,(req , res)=>{
    return res.json({succeed : true, user:req.user })
})

app.use("/api/user" , userRoute) ;

app.use("/api/message" , messageRoute);

// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

mongoose.connect(process.env.MONGODB_URI)
.then(
    server.listen(process.env.PORT,()=>{
        console.log(process.env.MONGODB_URI)
        console.log("we are listenning on port" , process.env.PORT);
    })
)