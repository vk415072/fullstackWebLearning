// DEMO OF ONE TO FEW DB

// 1. including mongoose
const mongoose = require("mongoose");

// 2. copied code for mongoose
mongoose
   .connect("mongodb://localhost:27017/relationshipDB", { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log("connection open!");
   })
   .catch((err) => {
      console.log("Oh no, Error!!!");
      console.log(err);
   });

// 3. defining user schema
const userSchema = new mongoose.Schema({
   first: String,
   last: String,
   // 4. but in here, mongoose will treat it as another document and will give it another id
   // 5. so adding id false
   address: [{ _id: { id: false }, city: String, state: String, country: String, street: String }],
});

const User = mongoose.model("User", userSchema);

// 6. making model
const makeUser = async () => {
   const u = new User({ first: "Harry", last: "Potter" });
   u.address.push({ street: "123 Sesame St.", city: "New York", country: "USA" });
   const res = await u.save();
   console.log(res);
};

makeUser();
