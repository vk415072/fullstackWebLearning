// getting node modules franc & langs & colors
const franc = require('franc');
const langs = require('langs');
const colors = require('colors');

// taking user input
const input = process.argv[2];
// getting language code from franc
const francCode = franc(input);

// 'und' is the error mesage from franc
if (francCode == 'und') {
    console.log('Sorry, try another sample'.red);
} else {
    // sending language code to langs and saving
    const language = langs.where('3', francCode);
    // getting only name from langs results and setting color green
    console.log(language.name.green)
}