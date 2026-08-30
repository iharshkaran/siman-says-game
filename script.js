let gameSeq = [];
let userSeq = [];
let highestLevel = Number(localStorage.getItem("simonHighestLevel")) || 0;

let btns = ["red", "green", "yellow", "purple"]

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

function startGame() {
    if (started === false) {
        started = true;

        levelUp();
    }
}

document.addEventListener('keypress', () => {
    startGame();
    startBtn.innerText = "Restart Game";
})


const startBtn = document.querySelector("#start-btn");

function btnFlash(btn) {
    btn.classList.add("flash");

    setTimeout(() => {
        btn.classList.remove("flash");
    }, 100)
}


function levelUp() {
    level++;
    userSeq = [];

    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`)
    gameSeq.push(randColor)
    btnFlash(randBtn);
}


function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {

        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 200);
        }

    } else {

        endGame();
    }
}


function btnPress() {
    if (started) {
        let btn = this;
        const userColor = btn.getAttribute('id');
        userSeq.push(userColor)

        checkAns(userSeq.length - 1)
    }
}


let allBtns = document.querySelectorAll('.btn');

for (btn of allBtns) {
    btn.addEventListener('click', btnPress)
}

function reset() {
    started = false;
    level = 0;
    userSeq = []
    gameSeq = []
}

let gameOver = document.querySelector("#game-over");

function showHighestLevel() {
    gameOver.innerHTML = "";

    let h2 = document.createElement("h2");
    h2.innerText = `Highest Level: ${highestLevel}`;
    h2.classList.add("highest-level");

    gameOver.appendChild(h2);
}


function endGame() {
    let currentScore = level - 1;

    // compare current and highest level
    if (currentScore > highestLevel) {
        highestLevel = level - 1;
        localStorage.setItem("simonHighestLevel", highestLevel);
    }

    showHighestLevel();

    h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b><br>Press any key to start.`;
    startBtn.style.display = "inline-block";
    reset();
}

const restartPopup = document.querySelector("#restart-popup");
const cancelBtn = document.querySelector("#cancel-btn");
const confirmRestart = document.querySelector("#confirm-restart");

startBtn.addEventListener("click", () => {
    if (!started) {
        startGame();
        started = true;
        startBtn.innerText = "Restart Game";
    } else {
        restartPopup.style.display = "flex";
    }
});

cancelBtn.addEventListener("click", () => {
    restartPopup.style.display = "none";
});

confirmRestart.addEventListener("click", () => {
    restartPopup.style.display = "none";

    reset();
    startGame();

    started = true;
    startBtn.innerText = "Restart Game";
});