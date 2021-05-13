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
app.use(morgan("tiny"));
// 8. now this will use as a middleware if i go to any url. Also it will log the info.

// // 9. using next() to continue the chain of middleware.
// // 10. sp whatever i enter in url, these will execute.
// app.use((req, res, next) => {
//   console.log("This is my 1st middleware!");
//   next();
//   // 11. this will still execute but after all the chained middlewares
//   // 12. i can stop the execution after "next()"" if i add "return" before it
//   console.log("This is my 1st middleware - after calling next!");
// });
// app.use((req, res, next) => {
//   console.log("This is my 2nd middleware!");
//   next();
// });

// 12. adding middleware function
// 13. we're just recreating what morgan was doing
app.use((req, res, next) => {
  console.log(req.method, req.path);
  // 14. i can change the type of req to for eg: GET
  //   req.method = 'GET'
  // 15. now doing something to the req in the middle
  // 16. for eg: adding time
  req.requestTime = Date.now();
  next();
});

// 2. testing
app.get("/", (req, res) => {
    // 17. using the requestTime from middleware
    console.log(`REQUEST DATE: ${req.requestTime}`);
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
