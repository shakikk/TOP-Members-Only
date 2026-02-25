const db = require("../db/queries");
const passport = require("../db/passportConfig");
const { validationResult } = require("express-validator");

async function getNewMessage(req, res){
  const errors = validationResult(req);

  if(req.user){
    res.render("newMessage", {errors: errors.array()});
  } else {
    res.redirect("/");
  }
}

async function postNewMessage(req, res){
  const errors = validationResult(req);

  if (!errors.isEmpty()){
    return res.render("newMessage", {
      errors: errors.array(),
      formData: req.body
    });
  }
  
  await db.newMessage(req.body.message_title, req.body.message_content, req.user.id);
  res.redirect("/");
}

module.exports = {getNewMessage, postNewMessage}