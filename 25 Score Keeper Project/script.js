const p1s = document.querySelector('#p1s');
const p2s = document.querySelector('#p2s');
const rounds = document.querySelector('#rounds');
const p1b = document.querySelector('#p1b');
const p2b = document.querySelector('#p2b');
const resetBtn = document.querySelector('#reset');
let p1counter = 0;
let p2counter = 0;
let sIndex = 0;
let isGameOver = false;

rounds.onchange = () => {
    sIndex = rounds.value;
}

// p1b.onclick = () => {
//     if (p1counter < sIndex) {
//         p1counter += 1;
//         p1s.innerHTML = p1counter;
//     } else {
//         // isGameOver = true;
//         p1b.disabled = true;
//         p2b.disabled = true;
//         p1s.style.color = 'Green'
//         p2s.style.color = 'Red'
//     }
// };

p1b.addEventListener('click', () => {
    if (p1counter < sIndex) {
        p1counter += 1;
        p1s.innerHTML = p1counter;
        if (p1counter == sIndex) {
            p1b.disabled = true;
            p2b.disabled = true;
            p1s.style.color = 'Green'
            p2s.style.color = 'Red'
        }
    }
});

p2b.addEventListener('click', () => {
    if (p2counter < sIndex) {
        p2counter += 1;
        p2s.innerHTML = p2counter;
        if (p2counter == sIndex) {
            p1b.disabled = true;
            p2b.disabled = true;
            p2s.style.color = 'Green'
            p1s.style.color = 'Red'
        }
    }
});

resetBtn.onclick = () => {
    p1counter = 0;
    p2counter = 0;
    p1s.innerHTML = '0';
    p2s.innerHTML = '0';
    sIndex = '0';
    rounds.selectedIndex = 0;
    p1b.disabled = false;
    p2b.disabled = false;
    p1s.style.color = ''
    p2s.style.color = ''
};
