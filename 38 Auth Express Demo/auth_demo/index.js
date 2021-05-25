const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const User = require("./models/user");

// connecting to mongoose
mongoose
   .connect("mongodb://localhost:27017/authDemo", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log("MONGO CONNECTION OPEN !!");
   })
   .catch((err) => {
      console.log("OH NO! MONGO CONNECTION ERROR!!");
      console.log(err);
   });

app.set("view engine", "ejs");
app.set("views", "views");

// parsing req.body
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "notagoodsecret" }));

app.get("/", (req, res) => {
   res.send("This is the homepage");
});

const requireLogin = (req, res, next) => {
   if (!req.session.user_id) {
      return res.redirect("/login");
   }
   next();
};

// user register routes
app.get("/register", (req, res) => {
   res.render("register");
});
app.post("/register", async (req, res) => {
   const { password, username } = req.body;
   // generating hash code from password
   // 12 is the time taken to generate "password salt"
   const hash = await bcrypt.hash(password, 12);
   // saving hash to db
   const user = new User({
      username,
      password: hash,
   });
   await user.save();
   req.session.user_id = user._id;
   res.redirect("/");
});

// user login routes
app.get("/login", (req, res) => {
   res.render("login");
});
app.post("/login", async (req, res) => {
   const { username, password } = req.body;
   const user = await User.findOne({ username });
   // comparing user pass with stored hash pass (user password first then hashed pass in params)
   const validPass = await bcrypt.compare(password, user.password);
   if (validPass) {
      // setting session user id to our user's id
      req.session.user_id = user._id;
      res.redirect("/secret");
   } else {
      res.redirect("/login");
   }
});

app.post("/logout", (req, res) => {
   req.session.user_id = null;
   // another method is to destroy that session entirely
   //    req.session.destroy();
   res.redirect("/login");
});

app.get("/secret", requireLogin, (req, res) => {
   res.render("secret");
});

app.get("/topsecret", requireLogin, (req, res) => {
   res.send("This is top secret");
});

app.listen(3000, () => {
   console.log("Serving at port 3000!");
});
