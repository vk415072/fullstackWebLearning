// 1. requiring mongoose
const mongoose = require("mongoose");
// 2. destructuring Schema from mongoose
const { Schema } = mongoose;
// 3. making farm schema
const farmSchema = new Schema({
   name: {
      type: String,
      required: [true, "Farm must have a name!"],
   },
   city: {
      type: String,
   },
   email: {
      type: String,
      required: [true, "Email required"],
   },
//    4. attaching product
   products: [
      {
         type: Schema.Types.ObjectId,
         ref: "Product",
      },
   ],
});

// 5. compiling our model
const Farm = mongoose.model("Farm", farmSchema);

// 6. exporting that from this file to use somewhere else
module.exports = Farm;
