// 1. basic app setup (1/3)
const express = require("express");
const app = express();
const path = require("path");
// 5. default mongoose code. With custom db name "shopApp"
const mongoose = require("mongoose");
// 31. changing db to new one
mongoose
   .connect("mongodb://localhost:27017/myShop3", {
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
// 30. requiring our farm model
const Farm = require("./models/farm");
// 21. requiring method-override
const methodOverride = require("method-override");

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

// 27. Farm Routes:

// 33. making farms list index page route
app.get("/farms", async (req, res) => {
   const farms = await Farm.find({});
   res.render("farms/index", { farms });
});

// 28. new farm route
app.get("/farms/new", (req, res) => {
   res.render("farms/new");
});

// 34. farm rote with an id
app.get("/farms/:id", async (req, res) => {
   const { id } = req.params;
   //  37. population products in farms
   const farm = await (await Farm.findById(id)).populate("products");
   res.render("farms/show.ejs", { farm });
});

// 35. route from farm id with new product
app.get("/farms/:id/products/new", (req, res) => {
   const { id } = req.params;
   res.render("products/new", { id });
});

// 29. new farm post req
app.post("/farms", async (req, res) => {
   // 32. creating new Farm and saving to db
   const farm = new Farm(req.body);
   await farm.save();
   res.redirect("/farms");
});

// 36. post route form /farms/id/products
app.post("/farms/:id/products", async (req, res) => {
   const { id } = req.params;
   const farm = await Farm.findById(id);
   console.log("----------------");
   console.log(farm);
   console.log("------------------");
   const { name, price, category } = req.body;
   const product = new Product({ name, price, category });
   console.log("----------------");
   console.log(product);
   console.log("------------------");
   farm.products.push(product);
   product.farm = farm;
   await farm.save();
   await product.save();
   res.redirect(`/farms/${id}`);
});

// 26. Product Routes:

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

// 3. basic app setup (3/3)
app.listen(3000, () => {
   console.log("App is listening on port 3000!");
});
