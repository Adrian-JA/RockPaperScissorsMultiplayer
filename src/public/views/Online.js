import { selectOption, showRules } from "../app/index.js";
import { leaveRoomInGame, renderScoreOnline, setTimer } from "../app/multiplayer.js";
import { BackToHome } from "../components/BackToHome.js";
import { HeaderPoints } from "../components/HeaderPoints.js";
import { Options } from "../components/Options.js";
import { Timer } from "../components/Timer.js";

function OnlineTemplate() {
    const title = "Online";

    const content = `
    <div class="local__content">
        ${BackToHome({ isOnline: true })}
        ${HeaderPoints()}
        ${Options()}
        ${Timer()}
    
        <button class="openRules">RULES</button>   

        <dialog class="rules" id="modalRules">
            <div class="rules__header">
                <h3 class="rules__title">Rules</h3>
                <button class="rules__close" id="closeModal">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <img class="rules__img" src="./assets/image-rules-bonus.svg" />
        </dialog>
    </div>
    `;
    const template = document.createElement("template");
    template.innerHTML = content.trim();

    const html = template.content.firstElementChild;

    eventHandler(html);

    return { title: title, html: html };
}

function eventHandler(html) {
    setTimer(html);
    leaveRoomInGame(html);
    selectOption(html, true);
    showRules(html);
    renderScoreOnline(html);
}

export { OnlineTemplate };
