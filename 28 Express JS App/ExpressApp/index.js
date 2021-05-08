const express = require("express");
const app = express();
// console.dir(app);

// this will run everytime i got a request.
// it takes 2 parameters i.e, request (incomming req from user) & response (we send the response from the server)
// app.use((req, res) => {
//     console.log("We got a new request");
//     res.send("Hey i got your request!")
// })

// starting express routing
// /cats => 'meow'
// /dogs => 'woof'
// '/' => (home route, does nothing)

app.get('/cats', (req, res) => {
    // console.log("Cat request!");
    res.send('meow!');
})

app.get('/dogs', (req, res) => {
    res.send('woof!');
})

app.get('/', (req, res) => {
    res.send('This is the Homepage!');
})

// now defining a pattern instead of an exact match
// we can add more patterns suck as: "/:postID" after "/:subreddit" and extract it also to use further.
app.get('/r/:subreddit', (req, res) => {
    // this will give what we enter in URL like:
    // /r/cats  then  {subreddit: 'cats'}
    // console.log(req.params);
    // extracting the term
    const { subreddit } = req.params;
    res.send(`this is ${subreddit} subreddit`);
});

// working with query String

app.get('/search', (req, res) => {
    // on typing "http://localhost:3000/search?q=dogs&color=red" we get:
    // {q: 'dogs, color: 'red'}
    // console.log(req.query);
    // extracting q
    const { q } = req.query;
    res.send(`here are the search results for: ${q}`)
})

// star to listen to all other req. It comes in last as all other above req will be ignored.
app.get('*', (req, res) => {
    res.send('I dont know this!');
})

// start a live port server
app.listen(3000, () => {
    console.log("listening on port 3000")
})