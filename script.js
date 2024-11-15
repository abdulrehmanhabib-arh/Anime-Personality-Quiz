const quizData = [
    {
        question: "What is your ideal day like?",
        options: [
            "Relaxing at home with a book",
            "Going on an adventure",
            "Hanging out with friends",
            "Exploring new things",
            "Binge-watching anime all day",
            "Going to a concert or event",
        ],
        answers: [1, 3, 2, 0, 5, 4],
    },
    {
        question: "What is your favorite type of music?",
        options: [
            "Calm and soothing",
            "Upbeat and energetic",
            "Something fun and silly",
            "Anything new and different",
            "Epic soundtracks",
            "Classic rock",
        ],
        answers: [0, 1, 2, 3, 4, 5],
    },
    {
        question: "What do you value most in a friendship?",
        options: [
            "Loyalty",
            "Adventure",
            "Fun",
            "Support",
            "Shared interests",
            "Honesty",
        ],
        answers: [0, 1, 2, 3, 4, 5],
    },
    {
        question: "Which setting do you prefer?",
        options: [
            "A cozy home",
            "A thrilling battlefield",
            "A lively city",
            "A mystical forest",
            "A futuristic world",
            "A peaceful countryside",
        ],
        answers: [0, 1, 2, 3, 4, 5],
    },
    {
        question: "How do you deal with challenges?",
        options: [
            "Take a step back and think it through",
            "Face them head-on",
            "Ask for help from friends",
            "Try something different",
            "Use humor to lighten the mood",
            "Stay calm and collected",
        ],
        answers: [0, 1, 2, 3, 4, 5],
    },
];

const characters = [
    { name: "Shinji Ikari", description: "A complex character who struggles with his identity." },
    { name: "Naruto Uzumaki", description: "An energetic and determined ninja with a big heart." },
    { name: "Luffy", description: "A fun-loving pirate who dreams big and values friendship." },
    { name: "Saitama", description: "A laid-back hero who enjoys life but seeks a challenge." },
    { name: "Light Yagami", description: "A brilliant strategist who believes in justice." },
    { name: "Mikasa Ackerman", description: "A loyal friend who will protect those she loves at all costs." },
    { name: "Edward Elric", description: "A determined alchemist who seeks redemption." },
    { name: "Goku", description: "An optimistic and powerful warrior always ready for a challenge." },
    { name: "Sailor Moon", description: "A kind-hearted hero who fights for love and justice." },
    { name: "Spike Spiegel", description: "A cool and laid-back bounty hunter with a mysterious past." },
    { name: "Natsu Dragneel", description: "A passionate and fiery dragon slayer who values friendship." },
    { name: "Kagome Higurashi", description: "A brave girl who travels through time to save others." },
];

let currentQuestionIndex = 0;
let selectedAnswers = [];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const resultElement = document.getElementById("result");
const resultTextElement = document.getElementById("result-text");
const restartButton = document.getElementById("restart-button");
const quizElement = document.getElementById("quiz");

function startQuiz() {
    currentQuestionIndex = 0;
    selectedAnswers = [];
    quizElement.classList.remove("hidden");
    resultElement.classList.add("hidden");
    showQuestion();
}

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.textContent = option;
        optionElement.classList.add("option");
        optionElement.addEventListener("click", () => selectAnswer(index, optionElement));
        optionsElement.appendChild(optionElement);
    });
}

function selectAnswer(index, optionElement) {
    // Highlight the selected option
    const options = document.querySelectorAll(".option");
    options.forEach(opt => {
        opt.classList.remove("selected"); // Remove previous selection
        opt.style.pointerEvents = 'none'; // Disable further selections
    });

    optionElement.classList.add("selected"); // Highlight the current selection
    selectedAnswers[currentQuestionIndex] = index;
    nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizElement.classList.add("hidden");
    resultElement.classList.remove("hidden");

    const results = selectedAnswers.map((answer, index) => {
        return characters[quizData[index].answers[answer]];
    });

    // For simplicity, let's take the first character as the result
    const resultCharacter = results[0];
    resultTextElement.textContent = `You are like ${resultCharacter.name}: ${resultCharacter.description}`;
}

restartButton.addEventListener("click", startQuiz);

// Start the quiz on page load
startQuiz();
