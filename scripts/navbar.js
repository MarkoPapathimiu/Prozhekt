const form = document.getElementById("signUpForm");
const userName = document.getElementById("usernameInput");
const password = document.getElementById("passwordInput");
const userAge = document.getElementById("ageInput");
const userHeight = document.getElementById("heightInput");
const userWeight = document.getElementById("weightInput");

const userNameLogIn = document.getElementById("usernameInputLogIn");
const passwordLogIn = document.getElementById("passwordInputLogIn");

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

//function to get User Name LogIn from localStorage
function getUserNameLogIn() {
    return JSON.parse(localStorage.getItem("userNameLogIn")) || [];
}

// function to get passwordLogIn from localStorage
function getPasswordLogIn() {
    return JSON.parse(localStorage.getItem("passwordLogIn")) || [];
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

// function to save User Name LogIn to localStorage
function saveUserNameLogIn(userNameLogIn) {
    localStorage.setItem("userNameLogIn", JSON.stringify(userNameLogIn));
}

// function to save passwordLogIn to localStorage
function savePasswordLogIn(passwordLogIn) {
    localStorage.setItem("passwordLogIn", JSON.stringify(passwordLogIn));
}



  form.addEventListener("submit", function(event) {
    event.preventDefault();
});
 
document.addEventListener("DOMContentLoaded", function() {
    const signUpForm = document.getElementById('signUpForm');
    const loginForm = document.getElementById("logInForm");

    // Sign up functionality
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const newUser = {
                username: document.getElementById('usernameInput').value,
                password: document.getElementById('passwordInput').value,
                age: document.getElementById('ageInput').value,
                height: document.getElementById('heightInput').value,
                weight: document.getElementById('weightInput').value
            };

            const exists = users.some(user => user.username === newUser.username);
            if (exists) {
                alert('Username already exists! Please choose another username.');
                return;
            }

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            alert('User registered successfully!');
            signUpForm.reset();
        });
    } else {
        console.error('Sign Up Form not found. Check your form ID and ensure the DOM is fully loaded.');
    }

    // Login functionality
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const enteredUserName = document.getElementById('usernameInputLogIn').value;
            const enteredPassword = document.getElementById('passwordInputLogIn').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.username === enteredUserName && user.password === enteredPassword);

            if (user) {
                console.log("Login successful:", enteredUserName);
                alert("You are now logged in!");
            } else {
                console.log("Login failed for user:", enteredUserName);
                alert("Invalid username or password.");
            }
        });
    } else {
        console.error('Login Form not found. Check your form ID and ensure the DOM is fully loaded.');
    }
});
