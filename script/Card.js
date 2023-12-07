export default class Card {
    constructor(question, index, cardStack) {
        this.question = question;
        this.index = index;
        this.cardStack = cardStack;
    }

    createCard() {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.zIndex = 1000 - this.index;
        card.style.transform = `translateY(${this.index * 30}px)`;
        card.innerHTML = `<p>${this.question.text}</p>`;
        this.cardStack.appendChild(card);
    }
}
