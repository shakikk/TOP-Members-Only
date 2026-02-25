const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");

userRouter.get("/", userController.getUserList);
userRouter.get("/sign-up", userController.getSignUp);
userRouter.post("/sign-up", 
  body("username").isLength({ min: 3 }).withMessage("Username must contain at least 3 characters"),
  body("first_name").isLength({ min: 2 }).withMessage("First name must contain at least 2 characters"),
  body("last_name").isLength({ min: 2 }).withMessage("Last name must contain at least 2 characters"),
  body("password").isLength({ min: 8 }).withMessage("Password must contain at least 8 characters"),
  body("confirm_password").custom((value, {req}) => { return value == req.body.password; }).withMessage("Passwords do not match"),
  userController.postSignUp);
userRouter.get("/log-in", userController.getLogIn);
userRouter.post("/log-in", userController.postLogIn);
userRouter.get("/log-out", userController.getLogOut);
userRouter.get("/t3rce5", userController.getT3rce5);
userRouter.get("/membership", userController.getMembership);
userRouter.post("/membership", userController.postMembership);

module.exports = userRouter;