// "use strict";

// // hide all pages
// function hideAllPages() {
//     let pages = document.querySelectorAll(".page");
//     for (let page of pages) {
//         page.style.display = "none";
//     }
// }

// // show page or tab
// function showPage(pageId) {
//     hideAllPages();
//     document.querySelector(`#${pageId}`).style.display = "block";
//     setActiveTab(pageId);
// }

// // sets active tabbar/ menu item
// function setActiveTab(pageId) {
//     let pages = document.querySelectorAll("nav>ul li");
//     for (let page of pages) {
//         if (`#${pageId}` === page.getAttribute("href")) {
//             page.classList.add("active");

//         } else {
//             page.classList.remove("active");
//         }
//     }
// }

// // navigate to a new view/page by changing href
// function navigateTo(pageId) {
//     location.href = `#${pageId}`;
// }

// // set default page or given page by the hash url
// // function is called 'onhashchange'
// function pageChange() {
//     let page = "home";
//     if (location.hash) {
//         page = location.hash.slice(1);
//     }
//     showPage(page);
// }

// pageChange(); // called by default when the app is loaded for the first time

const navigation = document.querySelectorAll("nav ul li");
let pages = document.querySelectorAll("#home .page");
let survey = document.querySelector("#survey");
let dashboard = document.querySelector(".dashboard");
console.log(pages)
console.log(survey)

function hidePages() {
    for (let page of pages) {
        page.style.display = "none";
    }
}

function hideTabs() {
    for (let tab of navigation) {
        tab.classList.remove("active")
    }
}

for (let i = 2; i < 4; i++) {
    navigation[i].addEventListener("click", () => {
        hidePages();
        hideTabs();
        pages[i - 2].style.display = 'block';
        dashboard.style.display = 'none';
        navigation[i].classList.add("active")
    })
}
navigation[1].addEventListener("click", () => {
    survey.classList.add("active");
    hideTabs();
    navigation[0].classList.add("active");

})
navigation[0].addEventListener("click", () => {
    hidePages()
    hideTabs();
    navigation[0].classList.add("active")
    dashboard.style.display = 'grid';
})

const surveyClose = document.querySelector("#survey span.close");
const surveyIntro = document.querySelector("#survey .intro");
const introClose = document.querySelector("#survey .intro> button");
surveyClose.addEventListener("click", () => {
    survey.classList.remove('active')
})
introClose.addEventListener("click", () => {
    surveyIntro.style.display = 'none';
})

// makes 'dashboard' in the nav active when you first log in
function makeHomeActive() {
    navigation[0].classList.add("active");
}
makeHomeActive();


//progress bar code

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

surveyDoneBtn.addEventListener('click', () => {
    survey.classList.remove('active');
    surveyDone.style.display = "none";
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

surveyFinishLaterBtn.addEventListener('click', () => {
    survey.classList.remove('active');
    surveyFinishLater.style.display = "none";
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

surveyDashboardDays.innerHTML = `${surveyDeadline} DAYS LEFT`
