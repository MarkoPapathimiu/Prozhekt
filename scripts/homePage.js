const fundetShprehjes = [
    "train hard.",
    "set new records.",
    "conquer your goals.",
    "go further than yesterday.",
    "become the best version of yourself."
];

let ePara = 0;

// Function to change the quote part
function ndryshoShprehjen() {
    const ndryshimet = document.getElementById('ndryshimet');
    ePara = (ePara + 1) % fundetShprehjes.length;
    ndryshimet.textContent = fundetShprehjes[ePara];
}

setInterval(ndryshoShprehjen, 3000);





const form = document.getElementById("logInForm");
const userName = document.getElementById("usernameInput");
const password = document.getElementById("passwordInput");
const userAge = document.getElementById("ageInput");
const userHeight = document.getElementById("heightInput");
const userWeight = document.getElementById("weightInput");


// function to get User Name from localStorage
function getUserName() {
    return JSON.parse(localStorage.getItem("userName")) || [];
}

// function to get password from localStorage
function getPassword() {
    return JSON.parse(localStorage.getItem("password")) || [];
}

// function to get age from localStorage
function getAge() {
    return JSON.parse(localStorage.getItem("userAge")) || [];
}

// function to get height from localStorage
function getHeight() {
    return JSON.parse(localStorage.getItem("userHeight")) || [];
}

// function to get weight from localStorage
function getWeight() {
    return JSON.parse(localStorage.getItem("userWeight")) || [];
}



// function to save User Name to localStorage
function saveUserName(userName) {
    localStorage.setItem("userName", JSON.stringify(userName));
}

// function to save password to localStorage
function savePassword(password) {
    localStorage.setItem("password", JSON.stringify(password));
}

// function to save age to localStorage
function saveAge(userAge) {
    localStorage.setItem("userAge", JSON.stringify(userAge));
}

// function to save height to localStorage
function saveHeight(userHeight) {
    localStorage.setItem("userHeight", JSON.stringify(userHeight));
}

// function to save weight to localStorage
function saveWeight(userWeight) {
    localStorage.setItem("userWeight", JSON.stringify(userWeight));
}



  form.addEventListener("submit", function(event) {
    event.preventDefault();
});
 

document.addEventListener("DOMContentLoaded", function() { 
    const form = document.querySelector('.modal-content form');

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

    const userName = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    saveUserName(userName);
    savePassword(password); // not secure!!

})}
});  

