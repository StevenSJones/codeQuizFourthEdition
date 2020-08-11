// list of all questions, choices, and answers in the form of an array of objects.
var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"
      ],
      answer: "all of the above"
    },
    {
      title:
        "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      title:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      answer: "console.log"
    }
  ];
  
  /*inside setInterval is the function alertMe and the unit of time * 1000 because unit of time for setInterval is milliseconds*/
  //initialize the timerCount and set it to 75
  var timerCounter = 75;
  function alertMe() {
    
  if (timerCounter > 0) {
      timerCounter -= 1;//using decriment to 
      document.querySelector("#timer").innerHTML =//this is where we grab the id with the query selecrtor
        "Time Remaining: " + timerCounter;//display on the page how much time remaining 
    }
          // If timer has already gone 2 times, then stop timer
          else {
              //The clearInterval() method stops the executions of the function specified in the setInterval() method
              questionIndex = questions.length;//going to last question and then 
              displayCurrentQuestion();
              clearInterval(myTimer);
    }
  }
   
  var questionIndex = 0;
  var wrongQuestions = [];
  var rightQuestions = [];
  var myTimer;
   
  //main function in which work is done on the data
  function startQuiz() {
  
    // Reset everything and display first question
    questionIndex = 0;
    document.querySelector("#startquiz").innerHTML = "Start Over";
    timerCounter = 75;
    clearInterval(myTimer);
    myTimer = setInterval(alertMe, 1000);
    displayCurrentQuestion();
  }
   //this is the function to display the current question.
   //it goes through the questions array once for every element in the array by grabbing the item by using the query selector.
  function displayCurrentQuestion() {//this is the work done on the data IF less than the length of the array
    if (questionIndex < questions.length) {
      document.querySelector("#timer").innerHTML =
        "Time Remaining: " + timerCounter;
      document.querySelector("#questionNum").innerHTML =
        "Question " + (questionIndex + 1) + ":";
      document.querySelector("#question").innerHTML =
        questions[questionIndex].title;
      document.querySelector("#q1").innerHTML =
        questions[questionIndex].choices[0];
      document.querySelector("#q2").innerHTML =
        questions[questionIndex].choices[1];
      document.querySelector("#q3").innerHTML =
        questions[questionIndex].choices[2];
      document.querySelector("#q4").innerHTML =
        questions[questionIndex].choices[3];
    } else {
      
      document.querySelector("#questionNum").innerHTML = "";
      if (wrongQuestions.length == 0) {
        document.querySelector("#question").innerHTML =
          "Your Score: " + rightQuestions.length + "/" + questions.length;
      } else {//grab elements and change text to print score
        document.querySelector("#question").innerHTML =
          "Your Score: " +
          rightQuestions.length +
          "/" +
          questions.length +
          " You got question(s) " +
          wrongQuestions.map(q => q + 1) +
          " wrong";
      }
      document.querySelector("#q1").innerHTML = "Answer 1";//assigns q1 an inner value of answer 1
      document.querySelector("#q2").innerHTML = "Answer 2";//assigns q2 an inner value of answer 2
      document.querySelector("#q3").innerHTML = "Answer 3";//assigns q3 an inner value of answer 3
      document.querySelector("#q4").innerHTML = "Answer 4";//assigns q4 an inner value of answer 4
      document.querySelector("#score").innerHTML =
        "Your Score: " + rightQuestions.length;//assigns score an inner value of your score concatenated with length of the right question array
    }
  }
   
  function answer() {
    var radios = document.querySelector("#answer");//this sets/creates the var radios and assigns it a value of answer
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        let answer = questions[questionIndex].answer;
        let choice = questions[questionIndex].choices[i];
        if (choice == answer) {
          alert("Correct");
          rightQuestions.push(questionIndex);
        } else {
          alert("Incorrect, 5 seconds will be subtracted.");
          wrongQuestions.push(questionIndex);
          timerCounter -= 5;
        }
      }
    }
    questionIndex += 1;
    displayCurrentQuestion();
  }
   
  function submitScore() {
    if (questionIndex >= questions.length) {
      var score = rightQuestions.length;
      var table = document.querySelector("#scoreTable");
      var row = table.insertRow();
      var initialCell = row.insertCell(0);
      var scoreCell = row.insertCell(1);
      initialCell.innerHTML = document.querySelector("#initials").value;
      scoreCell.innerHTML = score;
    }
  }