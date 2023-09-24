import { leaveInQueue } from "../app/multiplayer.js";
import { joinQueue } from "../app/sockets.js";

function WaitingRoom() {
    const title = "Waiting Room...";

    const content = `
    <div class="waiting__content">
        <a href="#/" class="backToHome"><i class="fa-solid fa-house backToHome__icon"></i> INICIO</a>
        <h2 class="waiting__title ">SEARCHING FOR OPPONENT <span class="waiting__loader loader"></span></h2>
    </div>
    `;
    const template = document.createElement("template");
    template.innerHTML = content.trim();

    const html = template.content.firstElementChild;

    eventHandler(html);

    return { title: title, html: html };
}

function eventHandler(html) {
    joinQueue();
    leaveInQueue(html);
}

export { WaitingRoom };
