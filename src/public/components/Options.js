function Options() {
    const content = `
    <div class="options">
        <div class="options__pentagon">
            <img class="options__img-pentagon" src="../assets/bg-pentagon.svg" />

            <button class="circle circle--yellow btn-option" >
                <div class="circle__content">
                    <img class="circle__img" src="./assets/icon-scissors.svg" />
                </div>
            </button>

            <button class="circle circle--blue btn-option">
                <div class="circle__content">
                    <img class="circle__img" src="./assets/icon-paper.svg" />
                </div>
            </button>

            <button class="circle circle--red btn-option">
                <div class="circle__content">
                <img class="circle__img" src="./assets/icon-rock.svg" />
                </div>
            </button>

            <button class="circle circle--purple btn-option">
                <div class="circle__content">
                    <img class="circle__img" src="./assets/icon-lizard.svg" />
                </div>
            </button>
                
            <button class="circle circle--cyan btn-option">
                <div class="circle__content">
                    <img class="circle__img" src="./assets/icon-spock.svg" />
                </div>
            </button>
        </div>
    </div>    
    `;

    return content;
}

export { Options };
