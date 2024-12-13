const words = [
        { word: "always", translation: "завжди" },
        { word: "never", translation: "ніколи" },
        { word: "sometimes", translation: "інколи" },
        { word: "usually", translation: "зазвичай" },
        { word: "often", translation: "часто" },
        { word: "rarely", translation: "рідко" },
        { word: "here", translation: "тут" },
        { word: "there", translation: "там" },
        { word: "now", translation: "зараз" },
        { word: "then", translation: "тоді" }
    ];

    let currentStep = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    const shuffleWords = () => words.sort(() => Math.random() - 0.5);
    let shuffledWords = shuffleWords();

    const showWord = () => {
        if (currentStep < 10) {
            $("#card").text(shuffledWords[currentStep].word);
        } else {
            showResult();
        }
    };

    const updateStats = () => {
        $("#step").text(currentStep);
        $("#correct").text(correctAnswers);
        $("#incorrect").text(incorrectAnswers);
    };

    const showResult = () => {
        const score = Math.round((correctAnswers / 10) * 100);
        $("#score").text(`${score}%`);
        $("#result").fadeIn();
    };

    $("#check").click(checkAnswer);

    $("#translation").keypress(function(event) {
        if (event.which === 13) { // "Enter" key pressed
            checkAnswer();
        }
    });
    $("#restart").click(function() {
        currentStep = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        shuffledWords = shuffleWords();
        updateStats();
        showWord();
        $("#result").fadeOut();
    });

    updateStats();
    showWord();

function checkAnswer() {
        const userTranslation = $("#translation").val().trim().toLowerCase();
        const correctTranslation = shuffledWords[currentStep].translation.toLowerCase();

        if (userTranslation === correctTranslation) {
            correctAnswers++;
        } else {
            incorrectAnswers++;
        }

        currentStep++;
        updateStats();
        $("#translation").val("");
        showWord();
}
