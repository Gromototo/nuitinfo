export let score = {
    jauge1: 50,
    jauge2: 50,
    jauge3: 50,
};

let progressBar;
let progressText;

export function updateScore(x) {
    score.jauge1 += x.jauge1;
    score.jauge2 += x.jauge2;
    score.jauge3 += x.jauge3;
    updateProgressBar(); // Appeler updateProgressBar après la mise à jour du score
}

function updateProgressBar() {
    if (progressBar && progressText) {
        progressBar.setAttribute('height', `${score.jauge1}%`);
        progressBar.setAttribute('y', `${100 - score.jauge1}%`);
        progressText.textContent = `${score.jauge1}%`;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    progressBar = document.querySelector('.progress-fill');
    progressText = document.querySelector('.progress-text');
    const increaseButton = document.getElementById('increaseButton');

    let playerProgress = 0;

    function increaseProgress() {
        if (playerProgress < 100) {
            playerProgress += 10; // Augmenter la progression de 10%
            updateScore({ jauge1: 10, jauge2: 0, jauge3: 0 }); // Mettre à jour le score ici
        }
    }

    increaseButton.addEventListener('click', increaseProgress);
    updateProgressBar();
});
