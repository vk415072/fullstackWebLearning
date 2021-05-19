// DEMO OF ONE TO MANY DB

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

// 3. defining schema
const productSchema = new mongoose.Schema({
   name: String,
   price: Number,
   season: {
      type: String,
      enum: ["Spring", "Summer", "Fall", "Winter"],
   },
});

// 5. making model
const Product = mongoose.model("Product", productSchema);

Product.insertMany([
   {
      name: "Goddess Melon",
      price: "250",
      season: "Summer",
   },
   {
      name: "Mango",
      price: "110",
      season: "Summer",
   },
   {
      name: "Orange",
      price: "90",
      season: "Winter",
   },
]);
