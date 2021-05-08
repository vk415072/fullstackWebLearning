console.log("js added");
// generating a random no.
var randNum = Math.floor(Math.random() * 20) +1
var userNum = prompt("Guess a number: ");
// checking
while (randNum != userNum) {
    if (randNum > userNum) {
        userNum = prompt("Your number is greater. Try again!");
    }
    else if (randNum < userNum) {
        userNum = prompt("Your number is lesser. Try again!");
    }   
}
alert("Yeah! You Won!")