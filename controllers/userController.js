const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const passport = require("../db/passportConfig");
const { validationResult } = require("express-validator");

async function getUserList(req, res){
  const users = await db.getAllUsers();
  const messages = await db.getAllMessages();
  res.render("index", {users, messages});
};

async function getSignUp(req, res){
  const errors = validationResult(req);

  res.render("sign-up", {errors: errors.array()});
};

async function postSignUp(req, res){
  const errors = validationResult(req);

  console.log(errors);
  if (!errors.isEmpty()) {
    return res.render("sign-up", {
      errors: errors.array(),
      formData: req.body
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  await db.createUser(
    req.body.username, 
    req.body.first_name, 
    req.body.last_name, 
    hashedPassword
  );

  res.redirect("/");
};

async function getLogIn(req, res){
  res.render("log-in");
};

async function postLogIn(req, res, next){
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in"
  })(req, res, next);
};

async function getLogOut(req, res, next){
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

async function getT3rce5(req, res){
  res.render("t3rce5");
};

async function getMembership(req, res){
  if(!req.user){
    res.redirect("/");
  }
  else{
    res.render("membership");
  }
};

async function postMembership(req, res){
  if(req.user){
    if(req.body.membership == "%o4kk$6jhE£"){
      await db.activateMembership(req.user.id);
      res.redirect("/");
    }
    else{
      res.render("membership");
    }
  }
};

module.exports = {getUserList, getSignUp, postSignUp, getLogIn, postLogIn, getLogOut, getT3rce5, getMembership, postMembership};
