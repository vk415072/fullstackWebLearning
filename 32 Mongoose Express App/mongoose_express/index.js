// 1. basic app setup (1/3)
const express = require("express");
const app = express();
const path = require("path");
// 5. default mongoose code. With custom db name "shopApp"
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/myShop", {
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

// 6. requiring our model
const Product = require("./models/product");

// 2. basic app setup (2/3)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 11. in post req, we don't have access to req.body immediately, we need to tell express to use this middleware:
app.use(express.urlencoded({ extended: true }));

// // 4. testing basic route
// app.get('/dog', (req, res) => {
//     res.send('Woff!');
// })

// 7. route to show our Product db
// 8. also making a async handler for this route as it will take time
app.get("/products", async (req, res) => {
  const products = await Product.find({});
  // console.log(products);
  // rendering index.ejs page and sending all products info to it.
  res.render("products/index.ejs", { products });
});

// 10. route for creating a new entry in db
app.get("/products/new", (req, res) => {
  res.render("products/new.ejs");
});

// 9. route for product with an id to access from show.ejs page
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/show.ejs", { product });
});

// 12. adding post req to get response after saving new.ejs form
app.post("/products", async (req, res) => {
  // console.log(req.body);
  // 13. adding received new product entry from "/products" to Product db
  const newProduct = new Product(req.body);
  // 14. await & async as it takes time.
  await newProduct.save();
  res.redirect('/products');
});

// 3. basic app setup (3/3)
app.listen(3000, () => {
  console.log("App is listening on port 3000!");
});
