const express = require("express");

// const cookieParser = require("cookie-parser");

const router = express.Router();

const messageController = require("../controllers/messageController");

const requireAuth = require("../midlewares/requireAuth");

// router.use(cookieParser());

// router.use(requireAuth);


router.post("/send" ,requireAuth, messageController.sendMessage);

router.get("/allmessages/:id" ,requireAuth, messageController.getMessages);

router.delete("/delete/:id" ,requireAuth, messageController.deleteMessage);

router.patch("/update/:id" ,requireAuth, messageController.updateMessage);


module.exports = router ;