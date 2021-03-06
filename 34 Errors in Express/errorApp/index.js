// 1. basic express app setup
const express = require("express");
const app = express();

// 4. requiring morgan
const morgan = require("morgan");

// 32. requiring AppError (our custom class from appError.js)
const AppError = require("./appError");

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

// 17. creating a middleware that will only execute if /dogs
// 18. if we get POST req then this will also execute but not the route handler (app.get) on comment no. 3
app.use("/dogs", (req, res, next) => {
  console.log("I love Dogs");
  next();
});

// // 21. protecting every single route
// app.use((req, res, next) => {
//   const { password } = req.query;
//   if (password === "pops") {
//     next();
//   }else{
//       res.send("Sorry you need a password (?password=)")
//   }
// });

// 22. specific function to protect particular the routes
const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "pops") {
    next();
  } else {
    // res.send("Sorry you need a password (?password=)");
    // 27. throwing custom error
    // throw new Error("PASSWORD REQUIRED!");
    // 33. now throwing custom error from our custom class
    throw new AppError("PASSWORD REQUIRED!", 401);
  }
};

// 2. testing
app.get("/", (req, res) => {
  // 17. using the requestTime from middleware
  console.log(`REQUEST DATE: ${req.requestTime}`);
  res.send("Home Page");
});

// 3. testing 2
app.get("/dogs", (req, res) => {
  res.send("Woff! Woff!");
});

// 23. using verifyPassword
app.get("/secret", verifyPassword, (req, res) => {
  res.send("This is a secret page");
});

// 24. defining /error route
app.get("/error", (req, res) => {
  // 25. method that doesn't exists
  chicken.fly();
  // 26. but express has some builtin error handling
});

// 19. if nothing else was match then at the end:
app.use((req, res) => {
  // 20. also sending 404 status
  res.status(404).send("NOT FOUND");
});

// // 28. (down at the bottom) writing custom error handling
// // 29. this will execute if get any error in routers.
// app.use((err, req, res, next) => {
//   console.log("**********************************");
//   console.log("***************ERROR**************");
//   console.log("**********************************");
//   res.status(500).send("WE GOT AN ERROR");
//   // 30. now if we use next() here, it will go to next middleware but not in case of error handling.
//   // 31. we need to pass the error with next()
//   //   console.log(err);
//   next(err);
// });

// 34. using custom error handling (diff tech)
app.use((err, req, res, next) => {
  // 35. grabbing err.status
  const { status } = err;
  res.status(status).send("ERRORRRR!!!");
});

// 1. basic express app setup
app.listen(3000, () => {
  console.log("App is running on localhost:300");
});
