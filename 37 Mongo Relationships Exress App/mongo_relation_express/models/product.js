// 1. requiring mongoose
const mongoose = require("mongoose");

// 2. making Schema
const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
      min: 0,
   },
   category: {
      type: String,
      lowercase: true,
      enum: ["fruit", "vegetable", "dairy"],
   },
   // 5. attaching Farm
   farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
   },
});

// 3. compiling our model
const Product = mongoose.model("Product", productSchema);

// 4. exporting that from this file to use somewhere else
module.exports = Product;
