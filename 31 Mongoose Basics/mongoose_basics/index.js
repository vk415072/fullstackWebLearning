const mongoose = require('mongoose');
// 1. deafult mogodb URI
// 2. "/movieApp" is the database custom name
mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connection open!")
    })
    .catch(err => {
        console.log("Oh no, Error!!!");
        console.log(err);
    });

// // 3. copies from mongoose docs
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', function(){
//     // 4. we are connected!
//     console.log("connection open!");
// });



// 5. defining new movies databse
// 6. first have to defne its Schema
const moviesSchema = new mongoose.Schema({
    tittle: String,
    year: Number,
    rating: String,
    score: Number
})

// now i've to make a model using this schema
const movie =  mongoose.model('Movie', moviesSchema)
// now i can make instances and save em to mongo db
const iron_man = new movie({title: 'Iron Man', year: 2004, score: 9.2, rating: 'R'});
iron_man.save();