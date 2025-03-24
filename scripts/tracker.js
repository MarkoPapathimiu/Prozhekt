// const $userID
// const $userName;
// const $password;
// const $userAge;
// const $userHeight;
// const $userWeight;
// const $userBMI;
// const $favoriteWorkouts
// const $favoriteRecipes
// const $activityLevel

function getUsers(){
    return JSON.parse(localStorage.getItem("users")) || [];
}

function userProfile(){
    var user = getUsers();

    $('#user-name').text(user.userName);
    $('#user-age').text(user.userAge);
    $('#user-height').text(user.userHeight);
    $('#user-weight').text(user.userWeight);
    $('#user-bmi').text(user.userBMI);
}
$(document).ready(function() {
    userProfile();
});

//Do bejme nje funksion te log in qe ruan nje vlere CurrentUser ne localstorage qe ruan ID e perdoruesit qe u be log in
//CurrentUser do na ndihmoje te bejme check kush eshte perdoruesi aktual qe te nxjerrim te dhenat e ketij perdoruesi
function getCurrentUser(){

}