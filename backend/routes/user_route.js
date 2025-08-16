const express= require("express");

const router = express.Router();

const requireAuth = require("../midlewares/requireAuth")

const {signup , signin , getUsers, logOut} = require("../controllers/userController")

router.post("/signin" ,signin)

router.post("/signup" ,signup)

router.get("/users" , requireAuth , getUsers)

router.get("/logout" , requireAuth ,logOut)


module.exports = router