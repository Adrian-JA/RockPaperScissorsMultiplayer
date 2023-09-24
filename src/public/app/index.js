import { Options } from "../components/Options.js";
import { OptionsChosen } from "../components/OptionsChosen.js";
import { ResultsGame } from "../components/ResultsGame.js";
import { SecondOption } from "../components/SecondOption.js";
import { checkOptionsPicked, firstPlayerOption, getScoreOnline, isOptionsPicked, showResults } from "./multiplayer.js";
import { requestToPlayAgain, sendPickOption } from "./sockets.js";

function showRules(elements) {
    const showModal = elements.querySelector(".openRules");
    const modalRules = elements.querySelector("#modalRules");
    const closeModal = elements.querySelector("#closeModal");

    showModal.addEventListener("click", () => {
        modalRules.show();
    });

    closeModal.addEventListener("click", () => {
        modalRules.close();
    });
}

const gameLogic = [
    {
        option: "scissors",
        beats: ["paper", "lizard"],
        color: "yellow",
    },
    {
        option: "paper",
        beats: ["rock", "spock"],
        color: "blue",
    },
    {
        option: "rock",
        beats: ["scissors", "lizard"],
        color: "red",
    },
    {
        option: "lizard",
        beats: ["spock", "paper"],
        color: "purple",
    },
    {
        option: "spock",
        beats: ["scissors", "rock"],
        color: "cyan",
    },
];

function getColorOption(optionPicked) {
    const { color } = gameLogic.find((option) => option.option === optionPicked);

    return color;
}

function renderOptionPicked(name, isOnline) {
    const color = getColorOption(name);
    const optionsContainer = document.querySelector(".options");
    optionsContainer.innerHTML = OptionsChosen(color, `./assets/icon-${name}.svg`, isOnline);
}

function selectOption(elements, isOnline) {
    const options = elements.querySelectorAll(".btn-option");
    const optionsContainer = elements.querySelector(".options");

    options.forEach((option, index) => {
        option.addEventListener("click", () => {
            const { option } = gameLogic[index];
            if (!isOnline) {
                renderOptionPicked(option);
                const optionBot = botPlay();
                setWinner(option, optionBot);
                return;
            }

            if (isOnline && isOptionsPicked.isFirstOptionPicked === false) {
                optionsContainer.classList.add("options--selected");

                firstPlayerOption(option);
                sendPickOption(option);

                if (checkOptionsPicked()) {
                    showResults(option);
                    return;
                }
            }
        });
    });
}

function getPickByBot() {
    const { option, color } = gameLogic[Math.floor(Math.random() * gameLogic.length)];

    return { option, color };
}

function botPlay() {
    const { option, color } = getPickByBot();
    const circleBot = document.querySelector(".circle--2");
    const circlePlayer = document.querySelector(".circle--1");
    setTimeout(() => {
        circleBot.innerHTML = SecondOption(`./assets/icon-${option}.svg`);
        circleBot.classList.add(`circle--${color}`, "scale-up-center");
        circleBot.parentElement.classList.add("slide-right");
        circlePlayer.parentElement.classList.add("slide-left");
    }, 300);

    return option;
}

function addShadowWin(card) {
    card.parentElement.addEventListener("animationend", () => {
        card.classList.add("shadow-scale-in");
    });
}

function getScore() {
    let score = localStorage.getItem("score");

    if (!score) score = 0;

    return score;
}

function updateScore(isOnline) {
    let score = getScore();
    let idLocalStorage = "score";

    if (isOnline) {
        score = getScoreOnline();
        idLocalStorage = "score-online";
    }

    let count = parseInt(score) + 1;
    localStorage.setItem(idLocalStorage, count);

    const scoreElement = document.getElementById("local-score");
    scoreElement.innerHTML = count;
}

function renderScore(elements) {
    const score = getScore();
    const scoreElement = elements.querySelector("#local-score");
    scoreElement.innerHTML = score;
}

function playAgain(isOnline) {
    const btnPlayAgain = document.querySelector("#play-again");
    let isClicked = true;

    btnPlayAgain.addEventListener("click", () => {
        if (!isClicked) return;

        if (isOnline) {
            isClicked = false;
            requestToPlayAgain();
            btnPlayAgain.classList.add("options--selected");
            return;
        }

        const options = document.querySelector(".options");
        options.innerHTML = Options();
        selectOption(options.parentNode);
    });
}

function setWinner(firstOption, secondOption, isOnline) {
    const info = document.getElementById("info");
    const firstCircle = document.querySelector(".circle--1");
    const secondCircle = document.querySelector(".circle--2");

    if (firstOption === secondOption) {
        info.innerHTML = ResultsGame("TIE");
        playAgain(isOnline);
        return;
    }

    const { beats: firstOptionBeats } = gameLogic.find((option) => option.option === firstOption);
    const isWin = firstOptionBeats.find((option) => option === secondOption);

    if (isWin) {
        info.innerHTML = ResultsGame("YOU WIN");
        updateScore(isOnline);
        playAgain(isOnline);
        addShadowWin(firstCircle);
        return;
    }

    info.innerHTML = ResultsGame("YOU LOSE");
    playAgain(isOnline);
    addShadowWin(secondCircle);
}

export { getColorOption, getPickByBot, playAgain, renderOptionPicked, renderScore, selectOption, setWinner, showRules };
