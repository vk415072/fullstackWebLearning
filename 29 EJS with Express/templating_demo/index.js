const express = require('express');
const app = express();
const path = require('path');

// telling my app to use EJS
app.set('view engine','ejs');
// also create a folder named "views" in current working directory.
// and create a file "home.ejs"

// now taking the current dir name and joining it to /views. as the /views will not work if i run index.js from a diff. path.
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) =>{
    // res.send('Hi!');

    //sending home.ejs using render (no need to specify like views/home.ejs)
    res.render('home.ejs');
})


app.listen(3000, () => {
    console.log('listening on 3000');
});