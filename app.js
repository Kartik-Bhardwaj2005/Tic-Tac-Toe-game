let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let heading = document.querySelector("h1");

let turnO = true;

let count = 0;

let winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const showHeadings = () => {
    resetBtn.classList.remove("hide");
}
showHeadings();

let startNewGame = () => {
    enableBtn();
    showHeadings();
    turnO = true;
    msgContainer.classList.add("hide");
    count = 0;
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        count++ ;
        box.disabled = true;
        checkWinner();
    });
});

const disableBtn = () => {
    for( let box of boxes) {
        box.disabled = true;
    }
}

const enableBtn = () => {
        for( let box of boxes) {
            box.disabled = false;
            box.innerHTML = "";
        }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    resetBtn.classList.add("hide");
    disableBtn();
}

const draw = () => {
    msg.innerText = 'Oops! nobody won the game';
    msgContainer.classList.remove("hide");
}

const checkWinner = () => {
    winPatterns.forEach((pattern) => {
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;

        if(posVal1 != "" && posVal2 != "" && posVal3 != "") {
            if(posVal1 === posVal2 && posVal2 === posVal3) {
                boxes.disabled = true;
                showWinner(posVal1);
            } else if(count === 9) {
                draw();
            }
        }
    });
}

newGameBtn.addEventListener("click", startNewGame);
resetBtn.addEventListener("click", startNewGame);