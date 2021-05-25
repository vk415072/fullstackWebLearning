const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: [true, "Username cannot be blank"],
   },
   // this will be our hashed password
   password: {
      type: String,
      required: [true, "Password cannot be blank"],
   },
});

// adding statics (some methods) to User model
userSchema.statics.findAndValidate = async function (username, password) {
   const foundUser = await this.findOne({ username });
   const isValid = await bcrypt.compare(password, foundUser.password);
   return isValid ? foundUser : false;
};

// middleware that run before saving
userSchema.pre("save", async function (next) {
   // checking if this.password is modified
   if (!this.isModified("password")) {
      // next to call save.
      return next();
   }
   this.password = await bcrypt.hash(this.password, 12);
   next();
});

module.exports = mongoose.model("User", userSchema);
