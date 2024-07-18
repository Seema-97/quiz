import { QUESTIONS } from "./DATA.js";

let rootElem = document.querySelector("#root");
let submitBtn = document.querySelector("#submit-btn");
let displayElem = document.querySelector(".display");
let checkAnsBtn = document.querySelector('#check-ans-btn')

QUESTIONS.forEach((item) => {
  let temp = ``;

  item.options.forEach((option) => {
    temp += `<p><input type="radio" class="question-${item.id}" name="question-${item.id}" value = "${option.option}"> 
        ${option.option}. ${option.name}</p>       
        `;
  });

  rootElem.innerHTML += `<div class="card card-container">
  <div class="card-body">
   <h5>${item.id}. ${item.question}? </h5>
    ${temp}
  </div>
</div>`;
});

let totalCorrect = 0;
let totalIncorrect = 0;

let correctAns = [];
let incorrectAns = [];

submitBtn.addEventListener("click", () => {

  QUESTIONS.forEach((item) => {
    let options = document.querySelectorAll(`.question-${item.id}`);

    options.forEach((option) => {
      if (option.checked) {
        if (option.value === item.correctAns) {
          totalCorrect++;
          correctAns.push({
            questionNum: item.id,
            answer: option.value,
          });
        } else {
          totalIncorrect++;
          incorrectAns.push({
            questionNum: item.id,
            yourAnswer: option.value,
            correctAns: item.correctAns,
          });
        }
      }
    });

    let correctTemp = ``;
    let incorrectTemp = `` ;
    correctAns.forEach(
      (ans) => {correctTemp += `<p>${ans.questionNum} ${ans.answer}</p>`}
    );

    incorrectAns.forEach(ans => {
        {incorrectTemp += `<p>${ans.questionNum} ${ans.yourAnswer}</p>`}
    })

    displayElem.innerHTML = ` 
             <div><p>Total correct answers are ${totalCorrect}</p>
             ${correctTemp}</div>   

             <div><p>Total incorrect answers are ${totalIncorrect}</p>
             ${incorrectTemp}</div>
        `;
  });
});


checkAnsBtn.addEventListener('click' , () => {
    QUESTIONS.forEach(item => {
        displayElem.insertAdjacentHTML("beforeend" , `<p>${item.id}.${item.correctAns} </p>`) 
    })
})
