const mongoose = require('mongoose');
// deafult mogodb URI
// "/movieApp" is the database custom name
mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connection open!")
    })
    .catch(err => {
        console.log("Oh no, Error!!!");
        console.log(err);
    });

// // copies from mongoose docs
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', function(){
//     // we are connected!
//     console.log("connection open!");
// });