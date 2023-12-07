document.addEventListener("DOMContentLoaded", function() {
  // Get the buttons by their IDs
  var flipButtons = document.querySelectorAll('.flip-btn');

  // Add event listeners to the buttons
  flipButtons.forEach(function(button) {
    button.addEventListener('click', flipCard);
  });
});

function flipCard() {
  const card = document.querySelector('.card-design');
  card.style.transform = 'rotateY(180deg)';
}