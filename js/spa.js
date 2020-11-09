
const navigation = document.querySelectorAll("nav ul li");
let pages = document.querySelectorAll("#home .page");
let survey = document.querySelector("#survey");
let dashboard = document.querySelector(".dashboard");
let logo = document.querySelector('.arla-logo');

// show login page first
login.style.display = "flex";

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

//logo leads to dashboard
logo.addEventListener('click', () => {
    hidePages()
    hideTabs();
    navigation[0].classList.add("active")
    dashboard.style.display = 'grid';
})

