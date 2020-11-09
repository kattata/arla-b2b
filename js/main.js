"use strict";

// ========== Firebase sign in functionality ========== //

// Your web app's Firebase configuration
const _firebaseConfig = {
    apiKey: "AIzaSyB_XZDIiicBhPGALFj4ikeZtqk34jQllXk",
    authDomain: "arlab2b.firebaseapp.com",
    databaseURL: "https://arlab2b.firebaseio.com",
    projectId: "arlab2b",
    storageBucket: "arlab2b.appspot.com",
    messagingSenderId: "786345968830",
    appId: "1:786345968830:web:2327bf9f1d27dee8cf8aef"
};
// Initialize Firebase
firebase.initializeApp(_firebaseConfig);
const _db = firebase.firestore();
const _susRef = _db.collection('sustainabilityData');
let _firebaseUI;
let _susData = [];

//get sustainability data
_susRef.orderBy("year", "desc").limit(1).onSnapshot(snapshotData => {
    _susData = [];
    snapshotData.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        _susData.push(data);
    });
    appendDatatoPlaceholder(_susData);
});

//append data 
function appendDatatoPlaceholder(susData) {
    let cowsInput = document.querySelector('#calculator-cows');
    let milkInput = document.querySelector('#calculator-milk');

    for (const data of susData) {
        cowsInput.placeholder = `${data.herdYearCows}`;
        milkInput.placeholder = `${data.herdMilkProduction}`
    }
}
// ========== FIREBASE AUTH ========== //
let ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            hideLogin();
            return false;
        }
    },
    signInFlow: 'popup',
    signInSuccessUrl: '#home',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ]
};

ui.start('#firebaseui-auth-container', uiConfig);

function hideLogin() {
    let loginPage = document.querySelector('#login');
    loginPage.style.display = "none";
}

// sign out user
function logout() {
    firebase.auth().signOut();
}

function appendUserData(user) {
    console.log(user);
    document.querySelector('#user-data').innerHTML = `
    <img class="profile-img" src="${user.photoURL || "img/placeholder.jpg"}">
    <h3>${user.displayName}</h3>
    <p>${user.email}</p>
  `;
}

// change nav cow img
let navCow = document.querySelector('.nav-cow-img');
let progressLi = document.querySelector('.progress-li');
let dashboardLi = document.querySelector('.dashboard-li');
let leaderboardLi = document.querySelector('.leaderboard-li');

dashboardLi.addEventListener('click', function () {
    changeCow('dashboard');
});

progressLi.addEventListener('click', function () {
    changeCow('progress');
});

leaderboardLi.addEventListener('click', function () {
    changeCow('leaderboard');
});

function changeCow(src) {
    navCow.src = `img/${src}-cow.png`;
}




// Calculator - range input
let rangeInput = document.querySelector('#calculator-range');
let rangeOutput = document.querySelector('.calculator-range-output');


rangeInput.addEventListener("input", () => {
    setRangeOutput(rangeInput, rangeOutput);
    calculate();
});

function setRangeOutput(input, output) {
    const val = input.value;
    const min = input.min ? input.min : 0;
    const max = input.max ? input.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    output.innerHTML = val;

    output.style.left = `calc(${newVal}% + (${25 - newVal * 0.55}px))`;
}

//Calculator - functionality
function checkIfInputEmpty() {
    let cows = document.querySelector('#calculator-cows');
    let milk = document.querySelector('#calculator-milk');
    let cowsValue = cows.value;
    let milkValue = milk.value;
    let cowsPlaceholder = cows.placeholder;
    let milkPlaceholder = milk.placeholder;
    let rangeValue = rangeInput.value;

    let cowsValueNumber = Number(cowsValue);
    let milkValueNumber = Number(milkValue);
    let cowsPlaceholderNumber = Number(cowsPlaceholder);
    let milkPlaceholderNumber = Number(milkPlaceholder);
    let rangeNumber = Number(rangeValue);

    if (cows.value.length == 0) {
        return Math.round(cowsPlaceholderNumber * milkPlaceholderNumber * rangeNumber * 0.01);
    } else {
        return Math.round(cowsValueNumber * milkValueNumber * rangeNumber * 0.01);
    }
}

function calculate() {
    displayCalculation(checkIfInputEmpty());
}

function displayCalculation(result) {
    document.querySelector('.result-number').innerHTML = `${result}€`;
}


// make self suffiency and milk production charts initially display: none
document.getElementById("myChart1").style.display = "none";
document.getElementById("myChart2").style.display = "none";

// ========== GLOBAL VARIABLES ========== //
const _dataRef = _db.collection("sustainabilityData");
let _sustainabilityData;

// 1: data from firebase
// listen for changes on _dataRef
_dataRef.orderBy("year").onSnapshot(snapshotData => {
    _sustainabilityData = []; // reset _sustainabilityData
    snapshotData.forEach(doc => { // loop through snapshotData - like for of loop
        let data = doc.data(); // save the data in a variable
        data.id = doc.id; // add the id to the data variable
        _sustainabilityData.push(data); // push the data object to the global array _sustainabilityData
    });
    console.log(_sustainabilityData);
    appendSelfSuffiency(_sustainabilityData); // call appendSelfSuffiency with _sustainabilityData as function argument
    appendCarbonFootprint(_sustainabilityData); //call appendCarbonFootprint with _sustainabilityData as function argument
    appendMilkProduction(_sustainabilityData); //call appendMilkProduction with _sustainabilityData as function argument
});

// CO2 PRODUCTION

// 2: preparing the data
function prepareCarbonData(sustainabilityData) {
    let footprint = [];
    let years = [];
    sustainabilityData.forEach(data => {
        if (data.region === 'south') { // in this case we only want the data from 'north'
            footprint.push(data.carbonFootprintWholeFarm);
            years.push(data.year);
        }
    });
    return {
        footprint,
        years
    }
}
//3: appending the chart
function appendCarbonFootprint(sustainabilityData) {
    let data = prepareCarbonData(sustainabilityData);
    console.log(data);
    // generate chart
    let chartContainer = document.querySelector('#myChart');
    let chart = new Chart(chartContainer, {
        type: 'line',
        data: {
            datasets: [{
                data: data.footprint,
                label: 'CO2 Production',
                fill: true,
                borderColor: "#e755ba",
                backgroundColor: gradient,
                pointBackgroundColor: "#55bae7",
                pointBorderColor: "#55bae7",
                pointHoverBackgroundColor: "#55bae7",
                pointHoverBorderColor: "#55bae7",
            }],
            labels: data.years
        }
    });
}

// SELF SUFFIENCY DATA

// 2: preparing the data
function prepareSuffiencyData(sustainabilityData) {
    let self = [];
    let years = [];
    sustainabilityData.forEach(data => {
        if (data.region === 'south') { // in this case we only want the data from 'north'
            self.push(data.herdSelfSuffiencyInFeed);
            years.push(data.year);
        }
    });
    return {
        self,
        years
    }
}
//3: appending the chart
function appendSelfSuffiency(sustainabilityData) {
    let data = prepareSuffiencyData(sustainabilityData);
    console.log(data);
    // generate chart
    let chartContainer = document.querySelector('#myChart1');
    let chart = new Chart(chartContainer, {
        type: 'line',
        data: {
            datasets: [{
                data: data.self,
                label: 'Self Suffiency in Feed',
                fill: true,
                borderColor: "#e755ba",
                backgroundColor: gradient,
                pointBackgroundColor: "#55bae7",
                pointBorderColor: "#55bae7",
                pointHoverBackgroundColor: "#55bae7",
                pointHoverBorderColor: "#55bae7",
            }],
            labels: data.years
        }
    });
}

// MILK PRODUCTION DATA

// 2: preparing the data
function prepareMilkData(sustainabilityData) {
    let mp = [];
    let years = [];
    sustainabilityData.forEach(data => {
        if (data.region === 'south') { // in this case we only want the data from 'north'
            mp.push(data.herdMilkProduction);
            years.push(data.year);
        }
    });
    return {
        mp,
        years
    }
}
//3: appending the chart
function appendMilkProduction(sustainabilityData) {
    let data = prepareMilkData(sustainabilityData);
    console.log(data);
    // generate chart
    let chartContainer = document.querySelector('#myChart2');
    let chart = new Chart(chartContainer, {
        type: 'line',
        data: {
            datasets: [{
                data: data.mp,
                label: "Milk Production",
                fill: true,
                borderColor: "#e755ba",
                backgroundColor: gradient,
                pointBackgroundColor: "#55bae7",
                pointBorderColor: "#55bae7",
                pointHoverBackgroundColor: "#55bae7",
                pointHoverBorderColor: "#55bae7",
            }],
            labels: data.years,
        }
    });
}



var gradient = chartContainer.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(250,174,50,1)');
gradient.addColorStop(1, 'rgba(250,174,50,0)');

// Leaderboar Dropdown

function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


function showButton() {
    let x = document.getElementById("show-info-paragraph");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    if (questionIterator == 3) {
        surveyForm.style.display = "none"
        surveyDone.style.display = "flex"
    }
};




function hideFunction() {
    if (myChart.style.display === "none") {
        myChart.style.display = "block";
        myChart1.style.display = "none";
        myChart2.style.display = "none";
    }
}

function hideFunction1() {
    if (myChart1.style.display === "none") {
        myChart1.style.display = "block";
        myChart.style.display = "none";
        myChart2.style.display = "none";
    }
}

function hideFunction2() {
    if (myChart2.style.display === "none") {
        myChart2.style.display = "block";
        myChart.style.display = "none";
        myChart1.style.display = "none";
    }
}