const questions = [
    {
        question: "Você conhecia a vítima?",
        answers: [
            { text: "Sim", correct: true },
            { text: "Não", correct: false },
        ],
    },
    {
        question: "Você telefonou para vítima?",
        answers: [
            { text: "Sim", correct: true },
            { text: "Não", correct: false },
        ],
    },
    {
        question: "Você mora perto da vítima?",
        answers: [
            { text: "Sim", correct: true },
            { text: "Não", correct: false },
        ],
    },
    {
        question: "Você já trabalhou com a vítima?",
        answers: [
            { text: "Sim", correct: true },
            { text: "Não", correct: false },
        ],
    },
    {
        question: "Você devia para a vítima?",
        answers: [
            { text: "Sim", correct: true },
            { text: "Não", correct: false },
        ],
    },
    {
        question: "Você tinha um álibi no momento do crime?",
        answers: [
            { text: "Sim", correct: true },
            { text: "Não", correct: false },
        ],
    },
    {
        question: "Você possui antecedentes criminais?",
        answers: [
            { text: "Sim", correct: true },
            { text: "Não", correct: false },
        ],
    },
    {
        question: "Você ouviu algum barulho estranho na noite do crime?",
        answers: [
            { text: "Sim", correct: true },
            { text: "Não", correct: false },
        ],
    },
    {
        question: "Você já foi ameaçado(a) pela vítima?",
        answers: [
            { text: "Sim", correct: true },
            { text: "Não", correct: false },
        ],
    },
    {
        question: "Alguém tentou entrar em contato com você sobre o crime?",
        answers: [
            { text: "Sim", correct: true },
            { text: "Não", correct: false },
        ],
    },
];

const perguntas = document.getElementById("pergunta");
const botaoResp = document.getElementById("btnResp");
const botaoProx = document.getElementById("btnProx");

let perguntaAtual = 0;
let pontuacao = 0;

function iniciarTeste() {
    perguntaAtual = 0;
    pontuacao = 0;
    botaoProx.innerHTML = "Próximo";
    mostrarPergunta();
}

function mostrarPergunta() {
    resetarEstado();
    let perguntaCorrente = questions[perguntaAtual];
    let numeroPergunta = perguntaAtual + 1;
    perguntas.innerHTML = numeroPergunta + ". " + perguntaCorrente.question;

    perguntaCorrente.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        botaoResp.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selecionarResposta);
    });
}

function resetarEstado() {
    botaoProx.style.display = "none";
    while (botaoResp.firstChild) {
        botaoResp.removeChild(botaoResp.firstChild);
    }
}

function selecionarResposta(e) {
    const botaoSelecionado = e.target;
    const isCorrect = botaoSelecionado.dataset.correct === "true";
    if (isCorrect) {
        pontuacao++;
    }
    Array.from(botaoResp.children).forEach(button => {
        button.classList.add(button.dataset.correct === "true" ? "correct" : "incorrect");
    });
    botaoProx.style.display = "block";
}

function mostrarResultado() {
    resetarEstado();
    if (pontuacao <= 5) {
        perguntas.innerHTML = `Você é suspeito`;
    } else if (pontuacao >= 6 && pontuacao <= 8) {
        perguntas.innerHTML = `Você é cúmplice`;
    } else {
        perguntas.innerHTML = `Você é culpado`;
    }
    botaoProx.innerHTML = "Reiniciar";
    botaoProx.style.display = "block";
}

function proxBotao() {
    perguntaAtual++;
    if (perguntaAtual < questions.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

botaoProx.addEventListener("click", () => {
    if (perguntaAtual < questions.length) {
        proxBotao();
    } else {
        iniciarTeste();
    }
});

iniciarTeste();