function MainTemplate() {
    const title = "Rock, Paper, Scissors";
    const template = document.createElement("template");
    const content = `
    <div class="main__content" >
        <div class="main__options">
            <a href="#/local" class="circle circle--red" id="btn-local" data-link>
                <span class="circle__content">
                    <i class="fa-solid fa-user circle__icon"></i>
                </span>
            </a>
            <p class="main__text">Local</p>
        </div>

        <div class="main__options">
            <a href="#/online" class="circle circle--cyan" id="btn-online" data-link>
                <span class="circle__content">
                    <i class="fa-solid fa-users circle__icon"></i>
                </span>
            </a>
            <p class="main__text">Online</p>
        </div>
    </div>    
`;
    template.innerHTML = content.trim();

    return { title: title, html: template.content.firstElementChild };
}

export { MainTemplate };
