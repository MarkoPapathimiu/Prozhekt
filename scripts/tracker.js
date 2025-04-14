const $workoutsList = $("#workoutsList");
const $recipesList = $("#recipesList");

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function getWorkouts() {
  return JSON.parse(localStorage.getItem("workouts")) || [];
}

function getRecipes() {
  return JSON.parse(localStorage.getItem("recipes")) || [];
}

function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

function saveCurrentUser(current) {
  localStorage.setItem("currentUserData", JSON.stringify(current));
}

// To calculate BMI for updated data
function calculateAndDisplayBmi(weight, height) {
  // Convert height from cm to meters
  height = height / 100;

  // Calculate BMI
  const bmi = weight / Math.pow(height, 2);
  const bmiRounded = bmi.toFixed(2);

  const bmiElement = document.getElementById("user-bmi");

  // Set BMI value
  bmiElement.textContent = bmiRounded;

  // Reset previous styles
  bmiElement.style.color = "";
  bmiElement.style.padding = "5px";
  bmiElement.style.borderRadius = "5px";

  // Set background color based on BMI range
  if (bmi < 18.5) {
    bmiElement.style.color = "#ffd700"; // Underweight
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiElement.style.color = "#28a745"; // Normal weight
  } else {
    bmiElement.style.color = "#dc3545"; // Overweight
  }
}

document.getElementById("logoutBtn").addEventListener("click", logOut);
// To log out
function logOut() {
  localStorage.removeItem("currentUser");
  alert("You are now logged out.");
  window.location.href = "logout.html";
}

// To delete user
// function deleteUser(userID) {
//   let projects = getProjects();
//   projects = projects.filter((project) => project.id !== projectID);
//   saveProject(projects);
//   renderProjects();
// }

function userProfile() {
  const users = getUsers();
  const currentUserID = getCurrentUser();

  console.log(
    "Current User ID:",
    currentUserID,
    "Type: ",
    typeof currentUserID
  ); // Debugging: Log the current user ID

  if (!currentUserID) {
    console.error("No current user ID found.");
    return; // Stop function execution if no current user ID is found
  }

  const currentUser = users.find((user) => user.userID === currentUserID);

  if (currentUser) {
    console.log("Found Current User:", currentUser); // Debugging: Log the found user
  }
  if (!currentUser) {
    console.error("User not found.");
    return; // Exit the function if no user matches the current ID
  }

  // Now save the currentUser object to localStorage
  localStorage.setItem("currentUserData", JSON.stringify(currentUser));

  console.log("This is the current user:", currentUser);

  // Update the DOM elements with user data
  document.getElementById("user-name").textContent = currentUser.username;
  document.getElementById("user-age").textContent = currentUser.age;
  document.getElementById("user-height").textContent = currentUser.height;
  document.getElementById("user-weight").textContent = currentUser.weight;
  document.getElementById("user-bmi").textContent = currentUser.bmi;

  calculateAndDisplayBmi(currentUser.weight, currentUser.height);

  // Update the greeting message
  const helloUser = document.getElementById("helloUser");
  if (helloUser) {
    helloUser.textContent = `Hello, ${currentUser.username}!`;
  }
}
$(document).ready(function () {
  userProfile();
});

// Favorite Workouts Section
function favWorkouts() {
  $workoutsList.html("");

  var list = ["uno", "due", "tre", "quatro", "cinco", "sexta"]; //temporary list for testing

  //printing out workouts list items
  list.forEach((item) => {
    const $workoutListItem = $("<li></li>");
    $workoutListItem.addClass("list-group-item mb-2");
    $workoutListItem.html(`
            <div class="d-flex">
                <div>
                    <h5 class="mb-1">${item}</h5>
                    <p class="mb-1"><strong>Desc:</strong> This is my fav workout</p>
                </div>
            </div>
        `);
    $workoutsList.append($workoutListItem);
  });
}
// Favorite Recipes Section
function favRecipes() {
  $recipesList.html("");

  var list = ["uno", "due", "tre", "quatro", "cinco", "sexta"]; //temporary list for testing

  //printing out recipes list items
  list.forEach((item) => {
    const $recipeListItem = $("<li></li>");
    $recipeListItem.addClass("list-group-item mb-2");
    $recipeListItem.html(`
            <div class="d-flex">
                <div>
                    <h5 class="mb-1">${item}</h5>
                    <p class="mb-1"><strong>Desc:</strong> This is my fav recipe</p>
                </div>
            </div>
        `);
    $recipesList.append($recipeListItem);
  });
}
$(document).ready(function () {
  favWorkouts();
  favRecipes();
});
