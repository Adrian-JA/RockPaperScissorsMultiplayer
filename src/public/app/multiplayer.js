import { Options } from "../components/Options.js";
import { SecondOption } from "../components/SecondOption.js";
import { Timer } from "../components/Timer.js";
import { MainTemplate } from "../views/Main.js";
import { OnlineTemplate } from "../views/Online.js";
import { getColorOption, getPickByBot, renderOptionPicked, selectOption, setWinner } from "./index.js";
import { changeUrl, renderTemplate } from "./router.js";
import { leaveGame, leaveQueue, sendPickOption } from "./sockets.js";

const isOptionsPicked = {
    firstOption: null,
    secondOption: null,
    isFirstOptionPicked: false,
    isSecondOptionPicked: false,
};

const confirmPlayAgain = {
    confirmPlayerCount: 0,
};

function startGame() {
    renderTemplate(OnlineTemplate());
}

function endGame() {
    const app = document.getElementById("app");
    app.innerHTML = null;
    renderTemplate(MainTemplate());
    changeUrl("#/");

    alert("The opponent has left the room.");
}

function leaveRoomInGame(html) {
    const btn = html.querySelector(".backToHome");

    btn.addEventListener("click", () => {
        leaveGame();
    });
}

function leaveInQueue(html) {
    const btn = html.querySelector(".backToHome");

    btn.addEventListener("click", () => {
        leaveQueue();
    });
}

function resetGame() {
    Object.keys(isOptionsPicked).forEach((option) => {
        isOptionsPicked[option] = null;
    });

    confirmPlayAgain.confirmPlayerCount = 0;
}

function addConfirmCount() {
    confirmPlayAgain.confirmPlayerCount += 1;

    return confirmPlayAgain.confirmPlayerCount;
}

function playAgainOnline() {
    const options = document.querySelector(".options");
    options.innerHTML = Options();

    resetGame();
    resetTimer();
    selectOption(options.parentNode, true);
}

function getScoreOnline() {
    let score = localStorage.getItem("score-online");

    if (!score) score = 0;

    return score;
}

function renderScoreOnline(elements) {
    const score = getScoreOnline();
    const scoreElement = elements.querySelector("#local-score");
    scoreElement.innerHTML = score;
}

function showResults(firstOption, secondOption) {
    if (!secondOption) {
        secondOption = isOptionsPicked.secondOption;
    }

    renderOptionPicked(firstOption, true);
    renderSecondOption(secondOption);

    setWinner(firstOption, secondOption, true);
}

function renderSecondOption(option) {
    const optionsContainer = document.querySelector(".options");
    optionsContainer.classList.remove("options--selected");
    const color = getColorOption(option);

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

function firstPlayerOption(option) {
    isOptionsPicked.firstOption = option;
    isOptionsPicked.isFirstOptionPicked = true;

    return;
}

function secondPlayerOption(option) {
    isOptionsPicked.secondOption = option;
    isOptionsPicked.isSecondOptionPicked = true;
}

function checkOptionsPicked() {
    const { isFirstOptionPicked, isSecondOptionPicked } = isOptionsPicked;
    if (isFirstOptionPicked && isSecondOptionPicked) return true;

    return;
}

function optionsPicked(name) {
    secondPlayerOption(name);
    if (checkOptionsPicked()) {
        showResults(isOptionsPicked.firstOption, name);
    }
}

function defaultPick() {
    const { option } = getPickByBot();
    firstPlayerOption(option);

    sendPickOption(option);
}

function setTimer(html) {
    let count = 15;
    const timerContainer = html.querySelector("#timer");
    timerContainer.innerHTML = count;
    const timer = setInterval(() => {
        timerContainer.innerHTML = count -= 1;
        if (checkOptionsPicked()) {
            removeTimer(timer, timerContainer);
        }

        if (count === 0) {
            removeTimer(timer, timerContainer);
            defaultPick();
        }
    }, 1000);
    return;
}

function resetTimer() {
    const divContainer = document.createElement("div");
    divContainer.innerHTML = Timer();
    document.body.appendChild(divContainer.firstElementChild);

    setTimer(document.body);
}

function removeTimer(timer, timerElement) {
    clearInterval(timer);
    timerElement.parentNode.remove();
}

export {
    addConfirmCount,
    checkOptionsPicked,
    endGame,
    firstPlayerOption,
    getScoreOnline,
    isOptionsPicked,
    leaveInQueue,
    leaveRoomInGame,
    optionsPicked,
    playAgainOnline,
    removeTimer,
    renderScoreOnline,
    setTimer,
    showResults,
    startGame,
};
