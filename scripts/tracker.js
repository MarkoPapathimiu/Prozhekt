// const $userID;
// const $userName;
// const $password;
// const $userAge;
// const $userHeight;
// const $userWeight;
// const $userBMI;
// const $favoriteWorkouts;
// const $favoriteRecipes;
// const $activityLevel;

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

function userProfile() {
  var user = getUsers();

  $("#user-name").text(user.userName);
  $("#user-age").text(user.userAge);
  $("#user-height").text(user.userHeight);
  $("#user-weight").text(user.userWeight);
  $("#user-bmi").text(user.userBMI);
}

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
$(document).ready(function () {
  userProfile();
  favWorkouts();
});
