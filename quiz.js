// select all elements

const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question: "What year was YouTube founded?",
        imgSrc  :"img/youtube.jpg",
        choiceA :"2006",
        choiceB :"2005",
        choiceC :"2007",
        correct : "B"
    },
    {
        question: "What year was Minecraft released?",
        imgSrc  : "img/minecraft.jpg",
        choiceA : "2010",
        choiceB : "2011",
        choiceC : "2012",
        correct : "B"
    },
    {
        question: "Where will the 2020 Summer Olympic Games be?",
        imgSrc  : "img/Olympics.png",
        choiceA : "Seoul",
        choiceB : "Barcelona",
        choiceC : "Tokyo",
        correct : "C"
    },
    {
        question: "Which character was in Super Smash Bros. 4(Wii U/3DS)?",
        imgSrc  : "img/smashjpg.jpg",
        choiceA : "Dark Samus",
        choiceB : "Solid Snake",
        choiceC : "Cloud Strife",
        correct : "C"
    },
    {
        question: "Who is the leader of the The Phantom Thieves from Persona 5?" ,
        imgSrc  : "img/takeyourheart.jpg",
        choiceA : "Joker",
        choiceB : "Queen",
        choiceC : "Fox",
        correct : "A"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnswer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    //turns progress bar circle green
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    //turns progress bar circle red
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    quiz.style.display = "none";
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/mindblown.gif" :
              (scorePerCent >= 60) ? "img/meh.gif" :
              (scorePerCent >= 40) ? "img/disappointed.gif" :
              (scorePerCent >= 20) ? "img/what.gif" :
              "img/congratulations.gif";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p align= 'left'>"+ scorePerCent +"%</p>";
}