let gameSeq = [];
let userSeq = [];
let highestLevel = 0;

let btns = ["red", "green", "yellow", "purple"]

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener('keypress', () => {
    if (started === false) {
        console.log("Game is started")
        started = true;

        levelUp();
    }
})


function btnFlash(btn) {
    btn.classList.add("flash");

    setTimeout(() => {
        btn.classList.remove("flash");
    }, 100)
}


function levelUp() {
    level++;
    highestLevel++;
    userSeq = [];

    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 3);;
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`)
    gameSeq.push(randColor)
    console.log(`gameSeq : ${gameSeq}`)
    btnFlash(randBtn);
}


function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){

        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 200);
        }

    } else {
        
        showHighestLevel();
        
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        reset();
    }
}


function btnPress(){
    let btn = this;
    const userColor = btn.getAttribute('id');
    userSeq.push(userColor)
    console.log(`userSeq : ${userSeq}`);
    
    
    checkAns(userSeq.length-1)
}


let allBtns = document.querySelectorAll('.btn');

for(btn of allBtns){
    btn.addEventListener('click', btnPress)
}

function reset(){
    started = false;
    level = 0;
    userSeq = []
    gameSeq = []
}

let gameOver = document.querySelector("#game-over");

function showHighestLevel() {
    gameOver.innerHTML = "";

    let h2 = document.createElement("h2");
    h2.innerText = `Highest Level: ${level}`;
    h2.classList.add("highest-level");

    gameOver.appendChild(h2);
}