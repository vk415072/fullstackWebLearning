// selectiong form & Ul data.
const tweetForm = document.querySelector('#tweetForm');
const tweetsContainer = document.querySelector('#tweets');

tweetForm.addEventListener('submit', function (event) {

    event.preventDefault();

    const usernameInput = tweetForm.elements.username;
    const tweetInput = tweetForm.elements.tweet;

    // calling addTweet() & passing inputs' values.
    addTweet(usernameInput.value, tweetInput.value);
    // resetting inputs.
    usernameInput.value = '';
    tweetInput.value = '';
});

// function to create li  of inputs & append to Ul.
const addTweet = (usernameInput, tweetInput) => {

    const newTweet = document.createElement('li');
    const bTag = document.createElement('b');

    bTag.append(usernameInput);
    newTweet.append(bTag);
    newTweet.append(` - ${tweetInput}`);
    tweetsContainer.append(newTweet);
}