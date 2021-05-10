const { json } = require('express');
const express = require('express');
const app = express();
// 7. require path to join views ejs
const path = require('path');


// 3. so to parse the body data type
app.use(express.urlencoded({ ecyended: true }));
// 5. similarly to parse the jason data:
app.use(express.json());

// 8. joining path of views ejs
app.set('views', path.join(__dirname, 'views')); 

// 6. now setting view engine for ejs
app.set('view engine', 'ejs')



// 9. making comments db
const comments = [
    {
        username: 'Tod',
        comment: 'lol, that is so funny!'
    },
    {
        username: 'Vivek',
        comment: 'I like to go to movies with my friends'
    },
    {
        username: 'Shiv',
        comment: 'Plz delete your account, Tod'
    },
    {
        username: 'Elsa',
        comment: 'Woof, woof, woof!!!'
    },
    {
        username: 'Mike',
        comment: 'you owe me 10 bucks!'
    }
]

// 10. render all comments to ejs
app.get('/comments', (req, res) => {
    res.render('comments/index.ejs', {comments})
})

// 11. now creating new comments
app.get('/comments/new', (req, res) => {
    res.render('comments/new.ejs');
})

// 12. now saving that new comment using post method
app.post('/comments', (req, res) =>{
    // console.log(req.body);
    const {username, comment} = req.body;
    // adding data to comments arrey
    comments.push({username, comment}); 
    res.send('it worked!');
})




app.get('/tacos', (req, res) => {
    res.send('GET /tacos response');
})

app.post('/tacos', (req, res) => {
    // 1. but in post, we can recieve a body
    console.log(req.body)
    // 2. this will result in undefined as we have not defined which type of body we want to recieve.

    // 4. extracting the body data
    const { meat, qty } = req.body;
    res.send(`OK, here are your ${qty} ${meat} Taco!`)
})


app.listen(3000, () => {
    console.log('listening to port 3000');
})