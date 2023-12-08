document.addEventListener('DOMContentLoaded', function() {
    // Répertorie toutes les cartes
    const cardArray = [
        {
            id:1,
            img:'images/glacier.png'
        },
        {
            id:1,
            img:'images/montée_des_eaux.png'
        },
        {
            id:2,
            img:'images/industrie.png'
        },
        {
            id:2,
            img:'images/pollution.png'
        },
        {
            id:3,
            img:'images/Effet_de_serre.png'
        },
        {
            id:3,
            img:'images/rechauffement.png'
        },
        {
            id:4,
            img:'images/agriculture.png'
        },
        {
            id:4,
            img:'images/deforestation.png'
        },
        {
            id:5,
            img:'images/minage.png'
        },
        {
            id:5,
            img:'images/secheresse.png'
        },
        {
            id:6,
            img:'images/permafrost.png'
        },
        {
            id:6,
            img:'images/dinosaure.png'
        }
    ];

    // On mélange l'ordre des cartes
    cardArray.sort(function () {
        return 0.5 - Math.random();
    });

    //Récupération de la grille du jeu et du résultat
    const grid = document.querySelector('.game_grid');
    //Récupération du nombre de paire trouvées
    const resultDisplay = document.getElementById('result');
    resultDisplay.textContent = '0';
    // Le compteur de temps
    const timeValue = document.getElementById("timer");
    timeValue.textContent = '00:00';
    let seconds = 0, minutes = 0;
    //Le compteur d'essais
    const moves = document.getElementById("moves");
    moves.textContent = '0';
    let movesCount = 0;
    const movesCounter = () => {
        movesCount += 1;
        moves.innerHTML = `${movesCount}`;
    };
    //  Démarre le timer
    const timeGenerator = () => {
        seconds += 1;
        //minutes logic
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }
        //formater les variables avant de les publier
        let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
        let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
        timeValue.innerHTML = ` ${minutesValue}:${secondsValue}`;
    };
    //variables pour récupérer les données de la cartes choisies
    let cardsChosen = [];
    let cardsChosenID = [];
    //variables pour stocker les cartes gagnés au cours de la partie
    let cardsWon = [];
    let interval;


    //Création du plateau de jeu
    function createBoard(){
        for (let pas=0; pas< cardArray.length; pas++) {
            let card = document.createElement('img');
            card.setAttribute('src', 'images/rien.png');
            card.setAttribute('data-id', pas);
            console.log(card);
            card.addEventListener("click", flipCard);
            let flipeffect = document.createElement('div');
            let flipcardinner = document.createElement('div');
            flipeffect.classList.add('flip-card');
            flipeffect.appendChild(flipcardinner);
            flipcardinner.classList.add('flip-card-inner');
            flipcardinner.appendChild(card);
            grid.appendChild(flipeffect);
        }
    }

    //vérifier les paires
    function CheckFormatch(){
        let cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenID[0];
        const optionTwoId = cardsChosenID[1];
        if(cards[optionTwoId].classList.contains('found') || cards[optionOneId].classList.contains('found') ){
            console.log('carte déjà trouvé');
        }
        else{
            if (cardsChosen[0] === cardsChosen[1]){
                cards[optionOneId].setAttribute('disabled', 'true');
                cards[optionOneId].classList.add('found');
                cards[optionTwoId].setAttribute('disabled', 'true');
                cards[optionTwoId].classList.add('found');
                cardsWon.push(cardsChosen);
            }
            else{
                cards[optionOneId].setAttribute('src', 'images/rien.png');
                cards[optionTwoId].setAttribute('src', 'images/rien.png');
            }
        }
        cardsChosen = [];
        cardsChosenID = [];
        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length === cardArray.length/2){
            resultDisplay.textContent = 'Bravo!';
            clearInterval(interval);
            Swal.fire({
                title: 'Congratulations you won !',
                html: '<p>Solving time: <span class="timewon"></span>s</p> <p>Total moves: <span class="moveswon"></span></p>',
                didOpen: () => {
                    const timewon = Swal.getHtmlContainer().querySelector('.timewon');
                    timewon.textContent = seconds;
                    const moveswon = Swal.getHtmlContainer().querySelector('.moveswon');
                    moveswon.textContent = movesCount;
                },
                text: 'Do you want to restart the game?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Restart',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    let timerInterval;
                    Swal.fire({
                        title: 'Restarting',
                        html: 'The game will restart in <b></b> milliseconds.',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            const b = Swal.getHtmlContainer().querySelector('b')
                            timerInterval = setInterval(() => {
                                b.textContent = Swal.getTimerLeft()
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('I was closed by the timer')
                        }
                    });
                    setTimeout(refreshPage, 2000);
                }
            })

        }
    }
    //retourner les cartes
    function flipCard(){
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].id);
        cardsChosenID.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if (cardsChosen.length === 2){
            movesCounter();
            setTimeout(CheckFormatch, 300);
        }
    }

    createBoard();
    //Un bouton pour commencer la partie (lancer le timer
    let start = document.querySelector('.game_start');
    start.addEventListener("click", () => {
        //movescount = 0;
        seconds = 0;
        minutes = 0;
        interval = setInterval(timeGenerator, 1000);
        moves.innerHTML = `${movesCount}`;
    });
    //Un bouton pour abandonner la partie
    let reset = document.querySelector('.game_reset');
    reset.addEventListener("click", refreshPage);
    function refreshPage(){
        window.location.reload();
    }
});
