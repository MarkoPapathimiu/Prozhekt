const starButtons = document.querySelectorAll('.star');

starButtons.forEach(function(starButton) {
    starButton.addEventListener('click', function() {
        starButton.classList.toggle('filled');
    });
});