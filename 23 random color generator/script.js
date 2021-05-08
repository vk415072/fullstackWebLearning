const h1 = document.querySelector("#h1");
const rndmBtn = document.querySelector("#rndmBtn");
const body = document.querySelector("body");

function getRndmClr() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

rndmBtn.addEventListener('click', function(){
    let color = getRndmClr();
    body.style.backgroundColor = color;
    h1.innerHTML = color;
});