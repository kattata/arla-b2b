
//suvey code starts

const previousBtn = document.querySelector(".button-container button:nth-of-type(1)");
const nextBtn = document.querySelector(".button-container button:nth-of-type(2)");
const bullets = document.querySelectorAll(".progress-container .steps");
const questions = document.querySelectorAll(".questions .category");

//survey done letiables
const surveyDone = document.querySelector("#survey .great-success");
const surveyDoneBtn = document.querySelector(".great-success button");
const surveyForm = document.querySelector("#survey .form");


const MAX_STEPS = 3;
let currentStep = 1;
let questionIterator = 0;
previousBtn.disabled = true;
nextBtn.addEventListener('click', () => {
    bullets[currentStep].classList.add('completed');
    currentStep += 1;
    previousBtn.disabled = false;
    if (currentStep === MAX_STEPS) {
        nextBtn.innerHTML = "FINISH"
    }
    if (currentStep === MAX_STEPS + 1) {
        previousBtn.disabled = true;

    }


});
nextBtn.addEventListener('click', () => {

    questionIterator++;
    if (questionIterator == 1) {
        questions[1].classList.add('completed');
        questions[0].classList.remove('completed');
        questions[2].classList.remove('completed');
    }
    if (questionIterator == 2) {
        questions[2].classList.add('completed');
        questions[1].classList.remove('completed');
        questions[0].classList.remove('completed');

    }
    if (questionIterator == 3) {
        surveyForm.style.display = "none"
        surveyDone.style.display = "flex"
    }
});
previousBtn.addEventListener('click', () => {
    questions[questionIterator].classList.remove('completed');
    questionIterator--;
    if (questionIterator == 1) {
        questions[1].classList.add('completed');
        questions[2].classList.remove('completed');
        questions[0].classList.remove('completed');
    }
    if (questionIterator == 0) {
        questions[0].classList.add('completed');
        questions[2].classList.remove('completed');
        questions[1].classList.remove('completed');
    }

});


previousBtn.addEventListener('click', () => {
    bullets[currentStep - 1].classList.remove('completed');
    currentStep -= 1;
    if (currentStep === 1) {
        previousBtn.disabled = true;
    }
    if (currentStep <= 3) {
        nextBtn.innerHTML = "NEXT"
    }
});

const progressBar = document.querySelector(".survey-progressbar .fill");
const progressText = document.querySelector(".survey-progressbar p");

surveyDoneBtn.addEventListener('click', () => {
    survey.classList.remove('active');
    surveyDone.style.display = "none";
    progressBar.style.width = `${Math.round(currentStep * 100 / 3)}%`;
    progressText.innerHTML = `Completed ${Math.round(currentStep * 100 / 3)}%`;
    currentStep = 1;
    questionIterator = 0;
    questions[0].classList.add('completed');
    questions[1].classList.remove('completed');
    questions[2].classList.remove('completed');
    bullets[1].classList.remove('completed');
    bullets[2].classList.remove('completed');

})
navigation[1].addEventListener("click", () => {
    surveyForm.style.display = "flex";
    surveyIntro.style.display = 'flex';
})

const surveyFinishLater = document.querySelector("#survey .finish-later");
const surveyFinishLaterBtn = document.querySelector("#survey .finish-later a");
const surveyFinishLaterBtnForm = document.querySelector("#survey .form>p");


surveyFinishLaterBtnForm.addEventListener('click', () => {
    surveyFinishLater.style.display = "flex";
    surveyForm.style.display = "none"
})

//updating progress code


surveyFinishLaterBtn.addEventListener('click', () => {
    survey.classList.remove('active');
    surveyFinishLater.style.display = "none";
    progressBar.style.width = `${Math.round(currentStep * 100 / 3)}%`;
    progressText.innerHTML = `Completed ${Math.round(currentStep * 100 / 3)}%`;

})

let now = new Date();
let start = new Date(now.getFullYear(), 0, 0);
let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
let oneDay = 1000 * 60 * 60 * 24;
let day = Math.floor(diff / oneDay);
console.log('Day of year: ' + day);
let surveyDeadline = 366 - day;
console.log('Days left: ' + surveyDeadline);

const surveyDashboardDays = document.querySelector(".text-wrapper-survey p:nth-of-type(2)");

surveyDashboardDays.innerHTML = `${surveyDeadline} DAYS LEFT`;

// FIREBASE

let surveyCows = document.querySelector('.survey-cows');
let surveyMilk = document.querySelector('.survey-milk');
let surveyFeed = document.querySelector('.survey-feed');
let surveySuff = document.querySelector('.survey-suff');
let surveyDiesel = document.querySelector('.survey-diesel');
let surveyElectricity = document.querySelector('.survey-electricity');

// add data to firebase
nextBtn.addEventListener('click', function () {
    if (surveyCows.value.length > 0) {
        createNewDoc();
    }
});

// create new document in firebase
function createNewDoc() {
    let newDoc = {
        herdYearCows: Number(surveyCows.value),
        herdMilkProduction: Number(surveyMilk.value),
        cowsFeedConsumption: Number(surveyFeed.value),
        herdSelfSuffiencyInFeed: Number(surveySuff),
        diesel: Number(surveyDiesel.value),
        electricity: Number(surveyElectricity.value),
        year: 2020
    }

    _susRef.add(newDoc);
}