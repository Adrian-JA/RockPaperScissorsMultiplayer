import { LocalTemplate } from "../views/Local.js";
import { MainTemplate } from "../views/Main.js";
import { WaitingRoom } from "../views/WaitingRoom.js";

function changeUrl(path) {
    history.pushState(null, null, path);
}

window.addEventListener("hashchange", () => {
    router(location.hash);
});

function renderTemplate(template) {
    document.title = template.title;
    const app = document.getElementById("app");
    app.innerHTML = null;
    app.appendChild(template.html);
}

function router(hash) {
    const routes = [
        {
            path: "#/",
            view: () => {
                return MainTemplate();
            },
        },
        {
            path: "#/online",
            view: () => {
                return WaitingRoom();
            },
        },
        {
            path: "#/local",
            view: () => {
                return LocalTemplate();
            },
        },
    ];

    const getRoute = routes.find((route) => route.path === hash);

    if (!getRoute) {
        changeUrl("/");
        renderTemplate(routes[0].view());
        return;
    }

    renderTemplate(getRoute.view());
}

window.addEventListener("DOMContentLoaded", () => {
    router(location.hash);
});

export { changeUrl, renderTemplate };
