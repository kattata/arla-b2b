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
let _firebaseUI;

// ========== FIREBASE AUTH ========== //
// Listen on authentication state change
firebase.auth().onAuthStateChanged(function (user) {
    if (user) { // if user exists and is authenticated
        userAuthenticated(user);
    } else { // if user is not logged in
        userNotAuthenticated();
    }
});

function userAuthenticated(user) {
    appendUserData(user);
    hideTabbar(false);
    showLoader(false);
}

function userNotAuthenticated() {
    hideTabbar(true);
    showPage("login");

    // Firebase UI configuration
    const uiConfig = {
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: '#home'
    };
    // Init Firebase UI Authentication
    if (!_firebaseUI) {
        _firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
    }
    _firebaseUI.start('#firebaseui-auth-container', uiConfig);
    showLoader(false);
}

// show and hide tabbar
function hideTabbar(hide) {
    let tabbar = document.querySelector('#tabbar');
    if (hide) {
        tabbar.classList.add("hide");
    } else {
        tabbar.classList.remove("hide");
    }
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

const burger = document.querySelector('.fa-bars');
const curtain = document.querySelector('.curtain');
const close = document.querySelector('.fa-times');


burger.addEventListener('click', () => {
    curtain.classList.toggle("active");
})
close.addEventListener('click', () => {
    curtain.classList.toggle("active");
})


// Calculator - range input
let rangeInput = document.querySelector('#calculator-range');
let rangeOutput = document.querySelector('.calculator-range-output');


rangeInput.addEventListener("input", () => {
    setRangeOutput(rangeInput, rangeOutput);
    turnInputToNumbers();
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

function turnInputToNumbers() {
    let cowsValue = document.querySelector('#calculator-cows').value;
    let milkValue = document.querySelector('#calculator-milk').value;
    let rangeValue = rangeInput.value;

    let cowsNumber = Number(cowsValue);
    let milkNumber = Number(milkValue);
    let rangeNumber = Number(rangeValue);

    calculate(cowsNumber, milkNumber, rangeNumber);

}

function calculate(a, b, c) {
    displayCalculation(Math.round(a * b * c * 0.01));
}

function displayCalculation(result) {
    document.querySelector('.result-number').innerHTML = `${result}€`;
}


console.log(turnInputToNumbers());



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
    appendSelfSuffiency(_sustainabilityData); // call appendCows with _sustainabilityData as function argument
    appendCarbonFootprint(_sustainabilityData); //call appendCarbonFootprint with _sustainabilityData as function argument
    appendMilkProduction(_sustainabilityData); //call appendMilkProduction with _sustainabilityData as function argument
});

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
    let chartContainer = document.querySelector('#myChart');
    let chart = new Chart(chartContainer, {
        type: 'line',
        data: {
            datasets: [{
                data: data.self,
                label: 'Number of Cows',
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

// 2: preparing the data
function prepareCarbonFootprintData(sustainabilityData) {
    // prepare data
    let carbonFootprint = [];
    let years = [];
    sustainabilityData.forEach(data => {
        if (data.region === 'south') { // in this case we only want the data from 'north'
            carbonFootprint.push(data.carbonFootprintWholeFarm);
            years.push(data.year);
        }
    });

    return {
        carbonFootprint,
        years
    }
}

//3: appending the chart
function appendCarbonFootprint(sustainabilityData) {
    let data = prepareCarbonFootprintData(sustainabilityData);
    console.log(data);

    // generate chart
    let chartContainer = document.querySelector('#carbonFootprint');
    let chart = new Chart(chartContainer, {
        type: 'line',
        data: {
            datasets: [{
                data: data.carbonFootprint,
                label: 'Carbon Footprint WholeFarm',
                fill: false,
                borderColor: "#e755ba",
                backgroundColor: "#e755ba",
                pointBackgroundColor: "#55bae7",
                pointBorderColor: "#55bae7",
                pointHoverBackgroundColor: "#55bae7",
                pointHoverBorderColor: "#55bae7",
            }],
            labels: data.years
        }
    });
}

// 2: preparing the data
function prepareMilkProductionData(sustainabilityData) {
    let years = [];
    let milkNorth = [];
    let milkSouth = [];
    sustainabilityData.forEach(data => {
        if (data.region === 'north') { // condition testing whether the region is 'north' og 'south'
            milkNorth.push(data.herdMilkProduction);
            years.push(data.year);
        } else if (data.region === 'south') {
            milkSouth.push(data.herdMilkProduction);
        }
    });
    return {
        years,
        milkNorth,
        milkSouth
    }
}

//3: appending the chart
function appendMilkProduction(sustainabilityData) {
    let data = prepareMilkProductionData(sustainabilityData);
    console.log(data);

    // generate chart
    let chartContainer = document.querySelector('#milkProduction');
    let chart = new Chart(chartContainer, {
        type: 'line',
        data: {
            datasets: [
                // first dataset - north
                {
                    data: data.milkNorth,
                    label: 'Milk Production North',
                    fill: false,
                    borderColor: "#e755ba",
                    backgroundColor: "#e755ba",
                    pointBackgroundColor: "#55bae7",
                    pointBorderColor: "#55bae7",
                    pointHoverBackgroundColor: "#55bae7",
                    pointHoverBorderColor: "#55bae7",
                },
                // second dataset - south
                {
                    label: 'Milk Production South',
                    data: data.milkSouth,
                    fill: false,
                    borderColor: "#55bae7",
                    backgroundColor: "#55bae7",
                    pointBackgroundColor: "#e755ba",
                    pointBorderColor: "#e755ba",
                    pointHoverBackgroundColor: "#e755ba",
                    pointHoverBorderColor: "#e755ba",
                    type: 'line'
                }
            ],
            labels: data.years
        }
    });
}

var gradient = chartContainer.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(250,174,50,1)');
gradient.addColorStop(1, 'rgba(250,174,50,0)');