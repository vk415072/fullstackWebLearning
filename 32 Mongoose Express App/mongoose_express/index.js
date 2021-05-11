// 1. basic app setup (1/3)
const express = require('express');
const app = express();
const path = require('path');
// default mongoose code. With custom db name "shopApp"
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN !!")
    })
    .catch(err => {
        console.log("OH NO! MONGO CONNECTION ERROR!!");
        console.log(err);
    });


// 2. basic app setup (2/3)
app.set('view', path.join(__dirname, 'views'));
app.set ('view engine', 'ejs');



// 4. testing basic route
app.get('/dog', (req, res) => {
    res.send('Woff!');
})



// 3. basic app setup (3/3)
app.listen(3000, () =>{
    console.log('App is listening on port 3000!');
})

