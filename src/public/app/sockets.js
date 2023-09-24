import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

import { addConfirmCount, endGame, optionsPicked, playAgainOnline, startGame } from "./multiplayer.js";

const socket = io();

function joinQueue() {
    socket.emit("client:joinQueue");
}

function leaveQueue() {
    socket.emit("client:leaveQueue");
}

function leaveGame() {
    socket.emit("client:leaveGame");
}

function sendPickOption(name) {
    socket.emit("client:pickOption", name);
}

function requestToPlayAgain() {
    socket.emit("client:playAgain");
}

socket.on("server:start-game", () => {
    startGame();
});

socket.on("server:userLeaveGame", () => {
    socket.emit("client:leaveRoom");
    endGame();
});

socket.on("server:pickOption", (name) => {
    optionsPicked(name);
});

socket.on("server:playAgain", (userId) => {
    const count = addConfirmCount();

    if (count === 2) {
        playAgainOnline();
    }
});

export { joinQueue, leaveGame, leaveQueue, requestToPlayAgain, sendPickOption };
