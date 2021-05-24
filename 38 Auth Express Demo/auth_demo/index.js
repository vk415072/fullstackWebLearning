const express = require("express");
const app = express();
const mongoose = require("mongoose");
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

app.get("/", (req, res) => {
   res.send("This is the homepage");
});

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
      res.send("yeah! welcome");
   } else {
      res.send("try again");
   }
});

app.get("/secret", (req, res) => {
   res.send("this is a secret! (You cannot see me unless logged in)");
});

app.listen(3000, () => {
   console.log("Serving at port 3000!");
});
