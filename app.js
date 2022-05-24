import { questions } from "./utils/questions.js";

const quizStartContainer = document.querySelector('.quiz-start');
const quizAppContainer = document.querySelector('.quiz-app');
const finalScreen = document.querySelector('.final-screen-display');

const startBtn = document.querySelector('.start-btn');
const btns = [...document.querySelectorAll('.question-btn')];
const restartBtn = document.querySelector('.restart-btn');
const tipBtn = document.querySelector('.tip-btn');

const quizQuestion = document.querySelector('.quiz-question');
const result = document.querySelector('.final-score');

let questionCounter = 0;
let userScore = 0;
let correctAnswer = '';
let answersGlobal = null;

/******************* Event listeners ******************/

startBtn.addEventListener('click', startQuiz);


/***************** Functions ********************/

function startQuiz() {
    quizStartContainer.classList.add('not-visible');
    quizAppContainer.classList.remove('not-visible');

    nextQuestion();
}

function nextQuestion() {
    if (questionCounter === questions.length) {
        quizAppContainer.classList.add('not-visible');
        finalScreen.classList.remove('not-visible');
        result.textContent = `${userScore}/${questions.length}`;

        restartBtn.addEventListener('click', restartGame);

        return
    }

    const question = getQuestion();
    answersGlobal = question.answers;
    displayQuestion(question.question);
    displayAnswers(question.answers);
    questionCounter++;
    correctAnswer = question.correctAnswer
    enableButtons();

    tipBtn.addEventListener('click', tipButton, false);

}

function tipButton(e) {
    const randomNumber = Math.floor(Math.random() * answersGlobal.length);

        if(answersGlobal[randomNumber] !== correctAnswer) {
            disableTipButton(btns[randomNumber]);
        }

        while(answersGlobal[randomNumber] === correctAnswer) {
            const randomNumber = Math.floor(Math.random() * answersGlobal.length);

            if(answersGlobal[randomNumber] !== correctAnswer) {
                disableTipButton(btns[randomNumber]);
            }

        }

    e.currentTarget.disabled = true;
    e.currentTarget.removeEventListener('click', tipButton, false);
}


function getQuestion() {
    return questions[questionCounter];
}

function displayQuestion(question) {
    quizQuestion.textContent = question;
}

function displayAnswers(answers) {
    btns.forEach((btn, i) => {
        btn.textContent = answers[i];
    })
}

function enableButtons() {

    btns.forEach((btn) => {
        btn.removeEventListener('click', handler, false);
        if(btn.disabled) {
            disableTipButton(btn);
        }
    })

    btns.forEach((btn) => {
        btn.addEventListener(
            'click',
            handler,
            false
        )
    })

}

function handler(e) {
    const btn = e.target;

    if (checkAnswer(btn.textContent, correctAnswer)) {
        btn.classList.add('correctAnswer');
    } else {
        btn.classList.add('wrongAnswer');
    }

    setTimeout(function () {
        removeBtnClasses(btn),
            nextQuestion()
    }, 2000);
}


function checkAnswer(userAnswer, correctAnswer) {
    if (userAnswer === correctAnswer) {
        userScore++;
        return true;
    } else {
        return false;
    }
}

function removeBtnClasses(btn) {
    if (btn.classList.contains('correctAnswer')) {
        btn.classList.remove('correctAnswer');
    } else if (btn.classList.contains('wrongAnswer')) {
        btn.classList.remove('wrongAnswer');
    }
}

function restartGame() {
    userScore = 0;
    questionCounter = 0;
    tipBtn.removeAttribute('disabled');
    quizAppContainer.classList.remove('not-visible');
    finalScreen.classList.add('not-visible');
    nextQuestion();
}

function disableTipButton(btn) {
    // console.log(btn);
    if(btn.disabled){
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}