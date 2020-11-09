

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
    hideTabs();
    hidePages()
    survey.classList.add("active");
    navigation[0].classList.add("active");
    dashboard.style.display = 'grid';
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


const burger = document.querySelector('.fa-bars');
const curtain = document.querySelector('.curtain');
const close = document.querySelector('.fa-times');


burger.addEventListener('click', () => {
    curtain.classList.toggle("active");
})
close.addEventListener('click', () => {
    curtain.classList.toggle("active");
})

const dashboardItemsHeading1 = document.querySelector(".dashboard-item:nth-of-type(1) h2");
const dashboardItemsHeading2 = document.querySelector(".dashboard-item:nth-of-type(4) h2");
const dashboardItemsHeading3 = document.querySelector(".dashboard-item:nth-of-type(5) h2");


dashboardItemsHeading1.addEventListener("click", ()=>{
     hideTabs();
    hidePages()
    survey.classList.add("active");
    navigation[0].classList.add("active");
    dashboard.style.display = 'grid';
})
dashboardItemsHeading2.addEventListener("click", ()=>{
   hidePages();
    hideTabs();
    pages[0].style.display = 'block';
    dashboard.style.display = 'none';
    navigation[2].classList.add("active")
})
dashboardItemsHeading3.addEventListener("click", ()=>{
   hidePages();
    hideTabs();
    pages[1].style.display = 'block';
    dashboard.style.display = 'none';
    navigation[3].classList.add("active")
})

// spa mobile code

const navMobileElements = document.querySelectorAll(".curtain ul li");

navMobileElements[0].addEventListener('click', () => {
    hidePages()
    hideTabs();
    navigation[0].classList.add("active")
    dashboard.style.display = 'grid';
    curtain.classList.toggle("active");

})
navMobileElements[1].addEventListener('click', () => {
    setTimeout(() => {
        survey.classList.add("active");
    }, 450)
    surveyForm.style.display = "flex";
    surveyIntro.style.display = 'flex';
    hidePages();
    dashboard.style.display = 'grid';
    hideTabs();
    navigation[0].classList.add("active");
    curtain.classList.toggle("active");
})


navMobileElements[2].addEventListener('click', () => {
    hidePages();
    hideTabs();
    pages[0].style.display = 'block';
    dashboard.style.display = 'none';
    navigation[2].classList.add("active")
    curtain.classList.toggle("active");
})
navMobileElements[3].addEventListener('click', () => {
    hidePages();
    hideTabs();
    pages[1].style.display = 'block';
    dashboard.style.display = 'none';
    navigation[3].classList.add("active")
    curtain.classList.toggle("active");
})


//logo leads to dashboard
logo.addEventListener('click', () => {
    hidePages()
    hideTabs();
    navigation[0].classList.add("active")
    dashboard.style.display = 'grid';
})

