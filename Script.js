let currentAnswer = "";
let corectAnswers = 0;
let currentIndex = 0;
let value = "neznam";

let AnswersDiv = document.querySelector(".AnswersDiv");
let questionText = document.getElementById("question");
questionText.innerHTML = masiv[0].question;
let questionCounter = document.getElementById("questionCounter");
questionCounter.innerHTML = (currentIndex+1)+"/"+masiv.length;
let submitButton = document.getElementById("Submit");
submitButton.disabled = true;

let allAnswers;

function setAnswers(answersObjects) {
    for(let i = 0; i < answersObjects.length; i++) {
        let answer = document.createElement("input");
        let label = document.createElement("label");
        let br = document.createElement("br");
        answer.type = "radio";
        answer.name = value; 
        answer.value = answersObjects[i].answer;
        answer.id = answer.value;
        label.for = answer.value;
        label.id = value;
        label.innerHTML = answer.value;
        console.log(answersObjects[i].answer);
        AnswersDiv.appendChild(answer);
        AnswersDiv.appendChild(label);
        AnswersDiv.appendChild(br);
    }

    allAnswers = document.querySelectorAll(`input[name="${value}"]`);

    allAnswers.forEach(index => {
        index.addEventListener("click", () => {
            currentAnswer = document.querySelector(`input[name="${value}"]:checked`).value;
            submitButton.disabled = false;
        })
    });
}

function onSubmit() {
    let writeIndex = 0;
    let allLabels = document.querySelectorAll(`label[id="${value}"]`);
    for(let i = 0; i < masiv[currentIndex].answers.length; i++) {
        if(masiv[currentIndex].answers[i].isCorrect == true) {
            writeIndex = i;
            break;
        }
    }
    if(currentAnswer === masiv[currentIndex].answers[writeIndex].answer) {
        corectAnswers++;
    } 
    currentIndex++;
    if(masiv.length > currentIndex) {
        questionText.innerHTML = masiv[currentIndex].question;
        questionCounter.innerHTML = (currentIndex+1)+"/"+masiv.length;
        allAnswers.forEach(indexValue => {
            indexValue.remove();
        });
        allLabels.forEach(indexValue => {
            indexValue.remove();
        });
        setAnswers(masiv[currentIndex].answers);
        submitButton.disabled = true;
        console.log(corectAnswers);
    }
    else {
        Result();
    }
}

function Result() {
    let gameRoot = document.getElementById('game');
    gameRoot.style.visibility = "hidden";
    let root = document.createElement("div");
    root.className = "root";
    root.id = "result";
    let body = document.querySelector("body");
    body.appendChild(root);

    let result = Math.round((corectAnswers / masiv.length) * 100);
    let congratsText = Congrats(result); 

    let congratsParagraf = document.createElement('h2');
    congratsParagraf.id = "congratulations";
    congratsParagraf.innerHTML = congratsText;
    root.appendChild(congratsParagraf);

    let firstParagraf = document.createElement('p');
    firstParagraf.innerHTML = `You got ${corectAnswers} points with ${corectAnswers} out of ${masiv.length} correct answers`;
    root.appendChild(firstParagraf);

    let secondParagraf = document.createElement('p');
    secondParagraf.innerHTML = `${result}% correct answers`;
    root.appendChild(secondParagraf);
}

function Congrats(result) {
    let text = "";
    if(result < 20) {
        text = "Better luck next time!";
    }
    else if(result >= 20 && result < 40) {
        text = "Good job!";
    }
    else if(result >= 40 && result < 60) {
        text = "Very good job!";
    }
    else if(result >= 60 && result < 80) {
        text = "Almost perfect! Well done!";
    }
    else if(result >= 80 && result < 100) {
        text = "Congratulations";
    }
    else {
        text = "100%! Congratulations!";
    }

    console.log("I was called from Congrats function! Value here is "+text+ " and result value is "+result);
    return text;
}


setAnswers(masiv[0].answers);

submitButton.addEventListener("click", onSubmit);