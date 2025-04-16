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
// function calculateAndDisplayBmi(weight, height) {
//   // Convert height from cm to meters
//   height = height / 100;

//   // Calculate BMI
//   const bmi = weight / Math.pow(height, 2);
//   const bmiRounded = bmi.toFixed(2);

//   const bmiElement = document.getElementById("user-bmi");

//   // Set BMI value
//   bmiElement.textContent = bmiRounded;

//   // Reset previous styles
//   bmiElement.style.color = "";
//   bmiElement.style.padding = "5px";
//   bmiElement.style.borderRadius = "5px";

//   // Set background color based on BMI range
//   if (bmi < 18.5) {
//     bmiElement.style.color = "#ffd700"; // Underweight
//   } else if (bmi >= 18.5 && bmi < 25) {
//     bmiElement.style.color = "#28a745"; // Normal weight
//   } else {
//     bmiElement.style.color = "#dc3545"; // Overweight
//   }
// }

// To log out
function logOut() {
  localStorage.setItem("currentUser", "0");
  console.log("You are now logged out.");
  window.location.href = "logout.html";
}
document.getElementById("logoutBtn").addEventListener("click", logOut);

// To delete user
// function deleteUser(userID) {
//   let projects = getProjects();
//   projects = projects.filter((project) => project.id !== projectID);
//   saveProject(projects);
//   renderProjects();
// }

function userProfile() {
  const currentUserID = getCurrentUser();

  if (!currentUserID || currentUserID === "0") {
    console.error("No valid current user ID found.");
    return;
  }

  fetch(`https://localhost:7084/api/user/GetUserById/${currentUserID}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return response.json();
    })
    .then((currentUser) => {
      // Save user data to localStorage
      saveCurrentUser(currentUser);

      // Update the DOM with server-provided BMI
      document.getElementById("user-name").textContent = currentUser.username;
      document.getElementById("user-age").textContent = currentUser.age;
      document.getElementById("user-height").textContent = currentUser.height;
      document.getElementById("user-weight").textContent = currentUser.weight;
      document.getElementById("user-bmi").textContent = currentUser.bmi;

      // Optional: Add color logic based on BMI
      const bmiElement = document.getElementById("user-bmi");
      bmiElement.style.color = "";
      if (currentUser.bmi < 18.5) {
        bmiElement.style.color = "#ffd700"; // Underweight
      } else if (currentUser.bmi < 25) {
        bmiElement.style.color = "#28a745"; // Normal
      } else {
        bmiElement.style.color = "#dc3545"; // Overweight
      }

      // Greeting
      const helloUser = document.getElementById("helloUser");
      if (helloUser) {
        helloUser.textContent = `Hello, ${currentUser.username}!`;
      }
    })
    .catch((error) => {
      console.error("Error loading user profile:", error);
    });
}
$(document).ready(function () {
  userProfile();
});

function updateProfile() {
  const currentUserID = parseInt(getCurrentUser());

  if (!currentUserID || currentUserID === "0") {
    console.error("No valid user ID found.");
    return;
  }

  // Get updated values from input fields (update with your actual input IDs)
  const updatedUser = {
    username: document.getElementById("usernameUpdate").value,
    age: parseInt(document.getElementById("ageUpdate").value),
    height: parseInt(document.getElementById("heightUpdate").value),
    weight: parseInt(document.getElementById("weightUpdate").value),
  };

  console.log("Sending updated user:", updatedUser);

  // Send PUT request
  fetch(`https://localhost:7084/api/user/UpdateUser/${currentUserID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update user profile");
      }
      return response.json();
    })
    .then((updatedUserData) => {
      saveCurrentUser(updatedUserData);
      window.location.href = "/tracker.html";
      alert("Profile updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
      alert("There was a problem updating your profile.");
    });
}
document.getElementById("updateForm").addEventListener("submit", function (e) {
  e.preventDefault();
  updateProfile();
});

function deleteUser() {
  const userId = getCurrentUser();

  if (!userId || userId === "0") {
    alert("You are not logged in.");
    return;
  }

  if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
    return;
  }

  fetch(`https://localhost:7084/api/user/DeleteUser/${userId}`, {
    method: "DELETE"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete account");
      }
      return response.text();
    })
    .then(() => {
      alert("Your account has been deleted.");
      localStorage.setItem("currentUser", "0");
      localStorage.removeItem("currentUserData");
      window.location.href = "/logout.html"; // Or redirect to home
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
      alert("Something went wrong while deleting your account.");
    });
}

document.getElementById("deleteBtn").addEventListener("click", deleteUser);


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
