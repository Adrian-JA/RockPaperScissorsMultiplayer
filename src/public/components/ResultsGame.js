function ResultsGame(msg) {
    const content = `
    <div class="options__infoContainer fadeIn">
        <p class="options__message" id="message">${msg}</p>

        <button class="options__btn-play" id="play-again">PLAY AGAIN</button>
    </div>
    `;

    return content;
}

export { ResultsGame };
