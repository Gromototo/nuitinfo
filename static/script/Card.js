export default class Card {
    constructor(question, index, cardStack) {
        this.question = question;
        this.index = index;
        this.cardStack = cardStack;
    }
    flipCard() {
        console.log("test")
        const card = document.querySelector('.card-data-container');
        card.style.transform = 'rotateY(180deg)';
    }

    createCard() {
        console.log(this.question)
        const card = document.createElement('div');
        card.className = 'card';
        card.style.zIndex = 1000 - this.index;
        card.innerHTML = `
        <div class="card-container">
            <div class="card-data-container ">
                <div class="side front">
                    <div>
                        <span class="card-data-question">${this.question.recto.question}</span>
                    </div>
                    <div class="card-data-interlocutor">
                        <div class="card-data-interlocutor-profil">
                            <img src="${this.question.recto.images[0]}"</img>
                            <p>${this.question.recto.interlocuteur}</p>
                        </div>
                        <div class="card-data-interlocutor-description">
                            <p>${this.question.recto.description}</p>
                        </div>
                    </div>
                        <div class="btn-container">
                            <button class="btn flip-btn agree" onclick=${this.flipCard}>D'accord</button>
                            <button class="btn flip-btn disagree" onclick=${this.flipCard}>Pas d'accord</button>
                        </div> 
                </div>        
                <div class="side back">
                    <p> Back Content<p>
                </div>
            </div>
        </div>`;

        this.cardStack.appendChild(card);
    }
}
