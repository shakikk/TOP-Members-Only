const express = require("express");
const app = express();
const session = require("cookie-session");
const passport = require("./db/passportConfig");
const path = require("node:path");

const userRouter = require("./routes/userRouter");
const messageRouter = require("./routes/messageRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({extended : false}));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", userRouter);
app.use("/messages", messageRouter);

const PORT = process.env.PORT;

app.listen(PORT, (error) => {
  if(error){
    throw(error);
  }
  else{
    console.log(`app listening on port ${PORT}`);
  }
});