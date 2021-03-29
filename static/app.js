class Boggle_Game {
    constructor() {
        this.setUpColumns($('#grid-container').data("x"));
        $('#submit-button').on('click', async (e) => {
            e.preventDefault();
            $('#request-result').text();
            var formGuess = $('input[name="guess"]');
            var result = await this.validateGuess(formGuess);
            this.scoreUpdater(result, formGuess);
            $('#request-result').text(result);

        });
        setInterval(this.timerCountDown, 1000);
    }

    setUpColumns(val) {
        var cssString = "";
        for (var i = 0; i < val; i++) {
            cssString += "auto "
        }
        $('#grid-container').css('grid-template-columns', cssString)
    }

    scoreUpdater(word, guess) {
        if (word.includes("ok")) {
            var currentScore = parseInt($('#score-value').text())
            console.log($('#score-value').text())
            $('#score-value').text(currentScore + parseInt(guess.val().length))
        }
    }

    async validateGuess(guess) {
        var result = await axios.get(`http://localhost:5000/validate-word/${guess.val()}`).then((v) => v.data)
        var answer = JSON.stringify(result);
        return answer;
    }

    async timerCountDown() {
        var timeOnTimer = parseInt($('#timer-sec').text());
        if (timeOnTimer == 0) {
            clearInterval(1);
           var  currentScore = parseInt($('#score-value').text());
            await axios.post('http://localhost:5000/game-over', { data: { "score": currentScore } });
            window.location.href = 'http://localhost:5000/'

        }
        else {
            $('#timer-sec').text(timeOnTimer - 1)
        }
    }

}

new Boggle_Game();