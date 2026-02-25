const { Router } = require("express");
const messageRouter = Router();
const messageController = require("../controllers/messageController");
const { body } = require("express-validator");

messageRouter.get("/newMessage", messageController.getNewMessage);
messageRouter.post("/newMessage",
  body("message_title").isLength({min: 8}).withMessage("Message title must be at least 8 characters long"),
  body("message_content").isLength({min: 8}).withMessage("Message subject must be at least 8 characters long"), 
  messageController.postNewMessage);  

module.exports = messageRouter;