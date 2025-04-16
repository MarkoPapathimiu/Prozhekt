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

    fetch("https://localhost:7084/api/user/CreateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("User creation failed");
        return response.json();
      })
      .then((data) => {
        alert("User created successfully! You can now log in.");
        signUpForm.reset();
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        alert("Username may already exist. Please try again.");
      });
  }

  // Login - API call
  function loginUser(event) {
    const currentUserId = getCurrentUser();

    if (currentUserId === "0") {
      event.preventDefault();

      const username = document
        .getElementById("usernameInputLogIn")
        .value.trim();
      const password = document.getElementById("passwordInputLogIn").value;

      const loginData = {
        username: username,
        password: password,
      };

      fetch("https://localhost:7084/api/user/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Invalid login");
          return response.json();
        })
        .then((user) => {
          console.log("Login successful:", user);
          alert("You are now logged in!");
          localStorage.setItem("currentUser", user.id);
          window.location.href = "/tracker.html";
        })
        .catch((error) => {
          console.error("Login failed:", error);
          alert("Invalid username or password.");
        });
    } else {
      alert("Log Out first!");
    }
  }

  if (signUpForm) {
    signUpForm.addEventListener("submit", createUser);
  }

  if (loginForm) {
    loginForm.addEventListener("submit", loginUser);
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

window.onload = loadNavbar();
