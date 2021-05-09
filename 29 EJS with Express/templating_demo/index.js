const express = require('express');
const app = express();
const path = require('path');

// telling my app to use EJS
app.set('view engine', 'ejs');
// also create a folder named "views" in current working directory.
// and create a file "home.ejs"

// now taking the current dir name and joining it to /views. as the /views will not work if i run index.js from a diff. path.
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    // res.send('Hi!');
    //sending home.ejs using render (no need to specify like views/home.ejs)
    res.render('home.ejs');
});


//creating another ejs file, generating random no. here and passing it to the ejs file.
app.get('/rand', (req, res) =>{
    const num = Math.floor(Math.random()*10) + 1;
    // num will be passed under the name "rand" to my random.ejs file
    res.render('random.ejs', {rand:num}); 
    // or i can just pass {num} directly and use same in ejs file
});


// now passing the url term to new ejs file
app.get('/r/:subreddit', (req, res) =>{
    const {subreddit} = req.params;
    res.render('subreddit', {subreddit});
});


// now sending an arrey of cats to another ejs file
app.get('/cats', (req, res) =>{
    const cats = ['dolly', 'monty', 'tiger', 'TJ', 'Molly'];
    res.render('cats.ejs', {cats});
})


app.listen(3000, () => {
    console.log('listening on 3000');
});