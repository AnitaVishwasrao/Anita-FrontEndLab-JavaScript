var scoreArray, currentQuestionNo, correctAnswer;
const question_obj = {
  questions: [
    {
      question_no: 1,
      question: "Javascript is an _______ language?",
      options: ["Compiled", "Interpreted", "Both A and B", "None of the above"],
      correct_answer: 1,
    },
    {
      question_no: 2,
      question:
        "Which of the following keywords is used to define a variable in Javascript?",
      options: ["var", "let", "Both A and B", "None of the above"],
      correct_answer: 2,
    },
    {
      question_no: 3,
      question:
        "Which of the following methods is used to access HTML elements using Javascript?",
      options: [
        "getElementById()",
        "getElementsByClassName()",
        "getElementsByTagName()",
        "All of the above",
      ],
      correct_answer: 3,
    },
    {
      question_no: 4,
      question: "Inside which HTML element do we put the JavaScript?",
      options: ["<js>", "<scripting>", "<javascript>", "<script>"],
      correct_answer: 3,
    },
    {
      question_no: 5,
      question: "How to stop an interval timer in Javascript?",
      options: [
        "clearInterval",
        "clearTimer",
        "intervalOver",
        "None of the above",
      ],
      correct_answer: 0,
    },
    {
      question_no: 6,
      question: "Which type of JavaScript language is ___",
      options: [
        "Object-Oriented",
        "Object-Based",
        "Assembly-language",
        "High-level",
      ],
      correct_answer: 1,
    },
  ],
};

function getTotalQuestions() {
  return question_obj.questions.length;
}

function validate(choiceElements) {
  invalidChoiceElements = choiceElements.filter(
    (choice) => !choice.hasAttribute("id")
  );
  return invalidChoiceElements.length > 0;
}

function getNumberFromText(inputText) {
  let numRegex = /(\d+)/g;
  const number = numRegex.exec(inputText);
  return parseInt(number[0]);
}

function showProgress() {
  var progress_element = document.getElementById("progress");
  progress_element.innerText = `Question ${++currentQuestionNo} of ${getTotalQuestions()}`;
}

function getScore() {
  var score = 0;
  scoreArray.forEach((scoreEle) => {
    if (scoreEle) {
      score++;
    }
  });
  return score;
}

function showResult() {
  var quizElement = document.getElementById("quiz");
  quizElement.classList.add("display-inline-block");

  let score = getScore();
  var result = `<h1>Your Score is : ${score}</h1><h1>Percentile Score: ${
    (score * 100) / getTotalQuestions()
  }%</h1>`;
  quizElement.innerHTML = result;
}

function showQuestion() {
  var choiceElements = document.getElementsByTagName("span");
  const choiceArray = Array.from(choiceElements);

  if (validate(choiceArray)) {
    alert("Failed to load question");
    return;
  }

  if (currentQuestionNo + 1 <= getTotalQuestions()) {
    const { question_no, question, options, correct_answer } =
      question_obj.questions[currentQuestionNo];

    correctAnswer = correct_answer;
    var question_element = document.getElementById("question");
    question_element.innerText = `${question_no}. ${question}`;

    choiceArray.forEach((choiceElement) => {
      var id_attr = choiceElement.getAttribute("id");
      choiceElement.innerText = options[getNumberFromText(id_attr)];
    });

    showProgress();
  } else {
    showResult();
  }
}

function saveScore() {
  scoreArray[currentQuestionNo] =
    correctAnswer === getNumberFromText(this.getAttribute("id"));

  showQuestion();
}

function addListeners() {
  var buttonElements = document.getElementsByTagName("button");
  const buttonArray = Array.from(buttonElements);

  buttonArray.forEach((button) => {
    button.addEventListener("click", saveScore);
  });
}

function initialise() {
  scoreArray = new Array(getTotalQuestions());
  currentQuestionNo = 0;
  addListeners();
  showQuestion();
}
