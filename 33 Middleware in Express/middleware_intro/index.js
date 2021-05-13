// 1. basic express app setup
const express = require("express");
const app = express();

// 4. requiring morgan
const morgan = require("morgan");

// 5. executing morgan as per morgan docs, but cannot use it alone
// morgan("tiny");

// 6. this "hey" with show on every single url req
// app.use(() => {
//   console.log("hey");
// });

// 7. now using morgan on similar function
app.use(morgan('tiny'));
// 8. now this will use as a middleware if i go to any url. Also it will log the info.

// 2. testing
app.get("/", (req, res) => {
  res.send("Home Page");
});

// 3. testing
app.get("/dogs", (req, res) => {
  res.send("Woff! Woff!");
});

// 1. basic express app setup
app.listen(3000, () => {
  console.log("App is running on localhost:300");
});
