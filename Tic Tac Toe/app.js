const player = "O";
const computer = "X";

let board_full = false;
let play_board = ["", "", "", "", "", "", "", "", ""];

window.difficulty = "";

const winner_statement = document.getElementById("winner");

check_board_complete = () => {
    let flag = true;
    play_board.forEach(element => {
        if (element != player && element != computer) {
            flag = false;
        }
    });
    board_full = flag;
};


const check_line = (a, b, c) => {
    return (
        play_board[a] == play_board[b] &&
        play_board[b] == play_board[c] &&
        (play_board[a] == player || play_board[a] == computer)
    );
};

const check_match = () => {
    for (i = 0; i < 9; i += 3) {
        if (check_line(i, i + 1, i + 2)) {
            document.querySelector(`#block_${i}`).classList.add("win");
            document.querySelector(`#block_${i + 1}`).classList.add("win");
            document.querySelector(`#block_${i + 2}`).classList.add("win");
            return play_board[i];
        }
    }
    for (i = 0; i < 3; i++) {
        if (check_line(i, i + 3, i + 6)) {
            document.querySelector(`#block_${i}`).classList.add("win");
            document.querySelector(`#block_${i + 3}`).classList.add("win");
            document.querySelector(`#block_${i + 6}`).classList.add("win");
            return play_board[i];
        }
    }
    if (check_line(0, 4, 8)) {
        document.querySelector("#block_0").classList.add("win");
        document.querySelector("#block_4").classList.add("win");
        document.querySelector("#block_8").classList.add("win");
        return play_board[0];
    }
    if (check_line(2, 4, 6)) {
        document.querySelector("#block_2").classList.add("win");
        document.querySelector("#block_4").classList.add("win");
        document.querySelector("#block_6").classList.add("win");
        return play_board[2];
    }
    return "";
};

const check_for_winner = () => {
    let res = check_match()
    if (res == player) {
        winner.innerText = "The Player Won!!";
        winner.classList.add("playerWin");
        board_full = true
    } else if (res == computer) {
        winner.innerText = "The Computer Won!!";
        winner.classList.add("computerWin");
        board_full = true
    } else if (board_full) {
        winner.innerText = "Draw!";
        winner.classList.add("draw");
    }
};

const render_board = () => {
    var board_container = document.querySelector(".play-area");
    board_container.innerHTML = "";
    play_board.forEach((e, i) => {
        board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`
        if (e == player || e == computer) {
            document.querySelector(`#block_${i}`).classList.add("occupied");
        }
    });
};

const game_loop = () => {
    render_board();
    check_board_complete();
    check_for_winner();
}

const addPlayerMove = e => {
    if (!board_full && play_board[e] == "") {
        play_board[e] = player;
        game_loop();
        if (window.difficulty == 0) {
            addComputerMove();
        } else if (window.difficulty == 1) {
            addComputerMoveMedium();
        } else {
            addComputerMoveHard();
        }
    }
};

const addComputerMove = () => {
    if (!board_full) {
        do {
            selected = Math.floor(Math.random() * 9);
        } while (play_board[selected] != "");
        play_board[selected] = computer;
        game_loop();
    }
};

const addComputerMoveMedium = () => {
    if (Math.random(10) < 5) { // should roll a random number 1-10 and if it is less 5 easy move if below hard

        addComputerMove();

    } else {

        addComputerMoveHard();

    }

};

const addComputerMoveHard = () => {
    if (!board_full) {
        let board_copy = play_board;


    }

    game_loop();

};

function getBestMove() {


}

const reset_board = () => {
    play_board = ["", "", "", "", "", "", "", "", ""];
    board_full = false;
    winner.classList.remove("playerWin");
    winner.classList.remove("computerWin");
    winner.classList.remove("draw");
    winner.innerText = "";
    render_board();
};

function clickEasy(button) {
    button.style.backgroundColor = "rgb(51, 199, 88)";
    button.style.color = "white";
    var medium = document.getElementById("medium");
    var hard = document.getElementById("hard");
    hard.style.color = "black";
    medium.style.color = "black";
    medium.style.backgroundColor = "unset";
    hard.style.backgroundColor = "unset";
    window.difficulty = 0;
}

function clickMedium(button) {
    button.style.backgroundColor = "rgb(192, 129, 11)";
    button.style.color = "white";
    var easy = document.getElementById("easy");
    var hard = document.getElementById("hard");
    easy.style.color = "black";
    hard.style.color = "black";
    easy.style.backgroundColor = "unset";
    hard.style.backgroundColor = "unset";
    window.difficulty = 1;
}

function clickHard(button) {
    button.style.backgroundColor = "rgb(197, 20, 7)";
    button.style.color = "white";
    var medium = document.getElementById("medium");
    var easy = document.getElementById("easy");
    easy.style.color = "black";
    medium.style.color = "black";
    medium.style.backgroundColor = "unset";
    easy.style.backgroundColor = "unset";
    window.difficulty = 2;
}