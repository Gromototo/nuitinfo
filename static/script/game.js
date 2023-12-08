export let score = {
    jauge1: 50,
    jauge2: 50,
    jauge3: 50,
};

export function updateScore(x) {
    console.log(score);
    score.jauge1 += x.jauge1;
    score.jauge2 += x.jauge2;
    score.jauge3 += x.jauge3;
    console.log(score);
}