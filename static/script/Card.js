export default class Card {
    constructor(question, index, cardStack) {
        this.question = question;
        this.index = index;
        this.cardStack = cardStack;
    }

    createCard() {
        console.log(this.question)
        const card = document.createElement('div');
        card.className = 'card';
        card.style.zIndex = 1000 - this.index;
        card.innerHTML = `
        <div class="card-container">
            <div class="card-data-container card-design">
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
                            <button class="btn flip-btn agree">D'accord</button>
                            <button class="btn flip-btn disagree">Pas d'accord</button>
                        </div> 
                </div>        
                <div class="side back">
                    <button class="btn suprr-card">D'accord</button>
                </div>
            </div>
        </div>`;

        this.cardStack.appendChild(card);
        const flipButtons = card.querySelectorAll('.flip-btn');
        flipButtons.forEach(btn => btn.addEventListener('click', () => this.flipCard(card)));

        const Suprr = card.querySelectorAll('.suprr-card');
        Suprr.forEach(btn => btn.addEventListener('click', () => this.suprCard(card)));
    }

    flipCard(cardElement) {
        const card = cardElement.querySelector('.card-data-container');
        card.style.transform = 'rotateY(180deg)';
    }

    suprCard(cardElement) {
        const card = cardElement.querySelector('.card-container');
        card.remove();
    }
}
