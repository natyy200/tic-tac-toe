const currentPlayer = document.querySelector('.currentPlayer');

let selected;
let player = "X";

let positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

function init() {
    selected = [];

    currentPlayer.innerText = `Jogador da Vez: ${player}`;

    document.querySelectorAll(".game button").forEach((item) => {
        item.innerText = "";
        item.addEventListener("click", newMove);
    });
}

init();

function newMove(e) {
    const index = e.target.getAttribute("data-i");
    e.target.innerText = player;
    e.target.removeEventListener("click", newMove);
    selected[index] = player;

    setTimeout(() => {
        check();
    }, [100]);

    player = player === "X" ? "O" : "X";
    currentPlayer.innerText = `Jogador da Vez: ${player}`;
}

function check() {
    let playerLastMove = player === "X" ? "O" : "X";

    const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);

    for (pos of positions) {
        if (pos.every((item) => items.includes(item))) {
            alert("O jogador '" + playerLastMove + "' Ganhou!");
            init();
            return;
        }
    }

    if (selected.filter((item) => item).length === 9) {
        alert("Deu empate!");
        init();
        return;
    }
}