function loadNavbar() {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
      initializeForms(); // Ensure event listeners are added AFTER navbar loads
    })
    .catch((error) => console.error("Error loading navbar:", error));
}

function initializeForms() {
  const signUpForm = document.getElementById("signUpForm");
  const loginForm = document.getElementById("logInForm");

  // Collect inputs for sign up
  const userName = document.getElementById("usernameInput");
  const password = document.getElementById("passwordInput");
  const userAge = document.getElementById("ageInput");
  const userHeight = document.getElementById("heightInput");
  const userWeight = document.getElementById("weightInput");

  // Function to generate random ID
  function generateId() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  // Function to get users from localStorage
  function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  //function to calculate BMI
  function calculateBmi(weight, height) {
    height = height / 100;
    const bmi = weight / Math.pow(height, 2);
    return bmi.toFixed(2);
  }

  // Function to save user to localStorage
  function saveUser(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Sign Up - API call
  function createUser(event) {
    event.preventDefault();

    const username = document.getElementById("usernameInput").value.trim();
    const password = document.getElementById("passwordInput").value;
    const age = parseInt(document.getElementById("ageInput").value);
    const height = parseInt(document.getElementById("heightInput").value);
    const weight = parseInt(document.getElementById("weightInput").value);

    if (!username || !password || !age || !height || !weight) {
      alert("Please fill in all fields.");
      return;
    }

    const userData = {
      username: username,
      password: password,
      age: age,
      height: height,
      weight: weight,
    };

    $.ajax({
      url: "https://localhost:7266/api/User/CreateUser",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(userData),
      success: function (response) {
        alert("User created successfully! You can now log in.");
        signUpForm.reset();
      },
      error: function (xhr) {
        console.error("Error creating user:", xhr);
        alert("Username may already exist. Please try again.");
      },
    });
  }

  // Login event listener
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const enteredUserName =
        document.getElementById("usernameInputLogIn").value;
      const enteredPassword =
        document.getElementById("passwordInputLogIn").value;

      const users = getUsers();
      const user = users.find(
        (user) =>
          user.username === enteredUserName && user.password === enteredPassword
      );

      if (user) {
        console.log("Login successful:", enteredUserName);
        console.log("You are now logged in!");
        // Save the current user's ID to localStorage
        localStorage.setItem("currentUser", user.userID);
      } else {
        console.log("Login failed for user:", enteredUserName);
        alert("Invalid username or password.");
      }
      window.location.href = "/tracker.html";
    });
  } else {
    console.error("Login Form not found.");
  }

  document
    .getElementById("progressTrackerNav")
    .addEventListener("click", function (e) {
      e.preventDefault();

      const currentUser = localStorage.getItem("currentUser");
      if (currentUser && currentUser !== "0") {
        window.location.href = "/tracker.html"; // User is logged in
      } else {
        window.location.href = "/logout.html"; // User not logged in
      }
    });
}

window.onload = loadNavbar;
