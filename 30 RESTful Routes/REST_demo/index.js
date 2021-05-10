const { json } = require('express');
const express = require('express');
const { parse } = require('path');
const app = express();
// 7. require path to join views ejs
const path = require('path');
// 19. now creating new ids for new comments using UUID node package
// 20. and replacing hard code ids
const { v4: uuid } = require('uuid');
// 26. adding method-override node package
// 27. we can't send a patch request from a ejs or html form so we have to fake it using methodoverride
const methodOverride = require('method-override')



// 3. so to parse the body data type
app.use(express.urlencoded({ ecyended: true }));
// 5. similarly to parse the jason data:
app.use(express.json());
// 8. joining path of views ejs
app.set('views', path.join(__dirname, 'views'));
// 6. now setting view engine for ejs
app.set('view engine', 'ejs')
// 28. setting method-override
app.use(methodOverride('_method'));



// 9. making comments db
let comments = [
    {
        // id: 1,
        id: uuid(),
        username: 'Tod',
        comment: 'lol, that is so funny!'
    },
    {
        // id: 2,
        id: uuid(),
        username: 'Vivek',
        comment: 'I like to go to movies with my friends'
    },
    {
        // id: 3,
        id: uuid(),
        username: 'Shiv',
        comment: 'Plz delete your account, Tod'
    },
    {
        // id: 4,
        id: uuid(),
        username: 'Elsa',
        comment: 'Woof, woof, woof!!!'
    },
    {
        // id: 5,
        id: uuid(),
        username: 'Mike',
        comment: 'you owe me 10 bucks!'
    }
]

// 10. render all comments to ejs
app.get('/comments', (req, res) => {
    res.render('comments/index.ejs', { comments })
})

// 11. now creating new comments
app.get('/comments/new', (req, res) => {
    res.render('comments/new.ejs');
})

// 12. now saving that new comment using post method
app.post('/comments', (req, res) => {
    // console.log(req.body);
    const { username, comment } = req.body;
    // 13. adding data to comments arrey
    comments.push({ username, comment, id: uuid() });
    // res.send('it worked!');
    // 14. now after getting this response, if user reload the page,
    // 15. it will once again send the post req to the server for the same data.
    // 16. so, we've to redirect the user to another page also.
    // 17. redirecting to /comments
    res.redirect('/comments');
})

// 18. getting comment via id
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    // console.log(comment);
    res.render('comments/show', { comment });
})

// 21. sending a patch req to update the comment
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    // 22. getting new comment text that was sent
    const newCommentText = req.body.edit;
    // console.log(req.body);
    // 23. getting original comment of same id
    const foundComment = comments.find(c => c.id === id);
    // 24. updating the original comment
    foundComment.comment = newCommentText;
    // console.log(newCommentText);
    // console.log(foundComment);
    res.redirect('/comments');
})

// 25. going to the page to edit  comments
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    // console.log(comment);
    res.render('comments/edit.ejs', { comment })
})

// 29. now deleting comments
// 30. just like patch, we also can't send delete req from a html form
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    // 31. this return a new arrey that does not have that id which we want to delete
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
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