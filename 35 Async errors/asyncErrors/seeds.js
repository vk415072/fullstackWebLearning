// 1. this file is used to seed the db initially
const Product = require("./models/product");
const mongoose = require("mongoose");

// 6. changing myShop to myShop2
mongoose
  .connect("mongodb://localhost:27017/myShop2", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MONGO CONNECTION OPEN !!");
  })
  .catch((err) => {
    console.log("OH NO! MONGO CONNECTION ERROR!!");
    console.log(err);
  });

// // 2. adding new data to db
// const p = new Product({
//     name: 'Grapefruit',
//     price: 110,
//     category: 'fruit'
// })
// // 3. saving to db
// p.save().then(p =>{
//     console.log(p)
// }).catch(e =>{
//     console.log(e)
// });

// 4. adding products in one go now
// 5. creating an array of products
const seedProducts = [
  {
    name: "Eggplant",
    price: 50,
    category: "vegetable",
  },
  {
    name: "Tomato",
    price: 30,
    category: "fruit",
  },
  {
    name: "Milk",
    price: 60,
    category: "dairy",
  },
  {
    name: "bread",
    price: 30,
    category: "dairy",
  },
  {
    name: "orange",
    price: 90,
    category: "fruit",
  },
];

// 6. inserting all to db
Product.insertMany(seedProducts)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
