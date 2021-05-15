// COPIED PROJECT FROM 32 Mongoose Express App

// 1. basic app setup (1/3)
const express = require("express");
const app = express();
const path = require("path");
// 5. default mongoose code. With custom db name "shopApp"
const mongoose = require("mongoose");
// 26. changing myShop to myShop2
mongoose
  .connect("mongodb://localhost:27017/myShop2", {
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
// 21. requiring method-override
const methodOverride = require("method-override");
// 27. requiring appError.js class
const AppError = require("./appError");

// 2. basic app setup (2/3)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// 11. in post req, we don't have access to req.body immediately, we need to tell express to use this middleware:
app.use(express.urlencoded({ extended: true }));
// 22. using method-override
app.use(methodOverride("_method"));

// // 4. testing basic route
// app.get('/dog', (req, res) => {
//     res.send('Woff!');
// })

// 7. route to show our Product db
// 8. also making a async handler for this route as it will take time
app.get("/products", async (req, res) => {
  // 25.looking for category query from show.ejs page
  const { category } = req.query;
  //   const products = await Product.find({});
  if (category) {
    const products = await Product.find({ category });
    // rendering index.ejs page and sending all products info to it.
    res.render("products/index.ejs", { products, category });
  } else {
    const products = await Product.find({});
    res.render("products/index.ejs", { products, category: "All" });
  }
  // console.log(products);
});

// 10. route for creating a new entry in db
app.get("/products/new", (req, res) => {
  res.render("products/new.ejs");
});

// 9. route for product with an id to access from show.ejs page
app.get("/products/:id", async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  // 31. adding error handling if product not found
  // 32. but in async functions we need to call next() and pass the error to it
  // 33. so that it can call our middleware function. (also adding next to prams).
  if (!product) {
    // 34. adding return to it so that res.render would not work after error and we would not get further errors.
    return next(new AppError("Product not found", 400));
  }
  res.render("products/show.ejs", { product });
});

// 12. adding post req to get response after saving new.ejs form
app.post("/products", async (req, res) => {
  // console.log(req.body);
  // 13. adding received new product entry from "/products" to Product db
  const newProduct = new Product(req.body);
  // 14. await & async as it takes time.
  await newProduct.save();
  res.redirect("/products");
});

// 15. now making a get req route to serve the edit ejs form
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit.ejs", { product });
});

// 16. now adding a put req to overwrite the product details to db from edit.ejs
// 17. in patch we change a portion of a doc but
// 18. in put we are replacing the whole object.
// 19. also we cant route put as the ejs form method is post so
// 20. so we've to use method-override npm package
app.put("/products/:id", async (req, res) => {
  // console.log(req.body);
  // res.send('PUT!!!');
  const { id } = req.params;
  // 23. updating to db
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

// 24. delete route setup
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

// 28. adding basic error handling middleware at the bottom
app.use((err, req, res, next) => {
  // 29. destructuring status and message from err
  // 30. also setting their defaults
  const { status = 500, message = "Something went wrong" } = err;
  // now it will through status & message from the err or the defaults.
  res.status(status).send(message);
});

// 3. basic app setup (3/3)
app.listen(3000, () => {
  console.log("App is listening on port 3000!");
});
