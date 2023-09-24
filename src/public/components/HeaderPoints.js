function HeaderPoints() {
    const content = `
    <div class="local__header">
        <div class="local__contentOptions">
            <p class="local__textOption">ROCK</p>
            <p class="local__textOption">PAPER</p>
            <p class="local__textOption">SCISSORS</p>
            <p class="local__textOption">LIZARD</p>
            <p class="local__textOption">SPOCK</p>
        </div>

        <div class="local__contentScore">
            <p class="local__textScore">SCORE</p>
            <p class="local__totalScore" id="local-score"></p>
        </div>
    </div>  
    `;

    return content;
}

export { HeaderPoints };
