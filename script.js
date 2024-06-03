const questions = [
    {
        question: "Você conhecia a vítima?",
        answers: [
            {text: "Sim", correct: true},
            {text: "Não", correct: false},
        ],
    },
    {
        question: "Você telefonou para vítima?",
        answers: [
            {text: "Sim", correct: true},
            {text: "Não", correct: false},
        ],
    },
    {
        question: "Você mora perto da vítima?",
        answers: [
            {text: "Sim", correct: true},
            {text: "Não", correct: false},
        ],
    },
    {
        question: "Você já trabalhou com a vítima?",
        answers: [
            {text: "Sim", correct: true},
            {text: "Não", correct: false},
        ],
    },
    {
        question: "Você devia para a vítima?",
        answers: [
            {text: "Sim", correct: true},
            {text: "Não", correct: false},
        ],
    },
    {
        question: "Você tinha um álibi no momento do crime?",
        answers: [
            {text: "Sim", correct: true},
            {text: "Não", correct: false},
        ],
    },
    {
        question: " Você possui antecedentes criminais?",
        answers: [
            {text: "Sim", correct: true},
            {text: "Não", correct: false},
        ],
    },
    {
        question: "Você ouviu algum barulho estranho na noite do crime?",
        answers: [
            {text: "Sim", correct: true},
            {text: "Não", correct: false},
        ],
    },
    {
        question: "Você já foi ameaçado(a) pela vítima??",
        answers: [
            {text: "Sim", correct: true},
            {text: "Não", correct: false},
        ],
    },
    {
        question: "Alguém tentou entrar em contato com você sobre o crime??",
        answers: [
            {text: "Sim", correct: true},
            {text: "Não", correct: false},
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        score++;
    }
    Array.from(answerButtons.children).forEach(button => {
        button.classList.add(button.dataset.correct === "true" ? "correct" : "incorrect");
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    if (score <= 5) {
        questionElement.innerHTML = `Você é suspeito`;
        nextButton.innerHTML = "Reiniciar";
        nextButton.style.display = "block";
    } else if (score >= 6 && score <= 8) {
        questionElement.innerHTML = `Você é cúmplice`;
        nextButton.innerHTML = "Reiniciar";
        nextButton.style.display = "block";
    } else {
        questionElement.innerHTML = `Você é culpado`;
        nextButton.innerHTML = "Reiniciar";
        nextButton.style.display = "block";
    }
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
