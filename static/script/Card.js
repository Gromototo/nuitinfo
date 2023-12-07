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
        <div class="card-data-container">
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
        </div>`;

        this.cardStack.appendChild(card);
    }
}
