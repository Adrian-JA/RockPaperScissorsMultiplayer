function OptionsChosen(colorClass, srcIcon, isOnline) {
    const content = `
    <div class="options__players-choice">
        <div class="options__content"  id="first-player">
            <h4 class="options__text">YOU PICKED</h4>

            <button class="circle circle--${colorClass} circle--pick circle--1">
                <span class="circle__content ">
                    <img class="circle__img" src="${srcIcon}" />
                </span>
            </button>
        </div>

        <div class="options__info" id="info"></div>

        <div class="options__content"  id="second-player">
            <h4 class="options__text">${isOnline ? "Opponent's Picked" : "THE HOUSE PICKED"}</h4>
            
            <button class="circle circle--pick circle--2">
            </button>
        </div>
    </div>
    `;

    return content;
}

export { OptionsChosen };
