const cardsArray = ['🍉', '🍉', '🍋', '🍋', '🍌', '🍌', '🍒', '🍒', '🍇', '🍇', '🍍', '🍍', '🍓', '🍓', '🍏', '🍏'];

let flippedCards = [];
let matchedCards = [];

function startGame() {
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = '';

    matchedCards = [];
    flippedCards = [];

    const shuffledCards = shuffle(cardsArray);

    shuffledCards.forEach(emoji => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.dataset.card = emoji;
        div.textContent = ''; // Não mostra o emoji inicialmente
        div.addEventListener('click', flipCard);
        gridContainer.appendChild(div);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !flippedCards.includes(this)) {
        this.textContent = this.dataset.card; // Mostra o emoji quando clicado
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.card === secondCard.dataset.card) {
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];

        if (matchedCards.length === cardsArray.length) {
            setTimeout(() => {
                alert('Parabens vc ganhou');
            }, 500);
        }
    } else {
        setTimeout(() => {
            flippedCards.forEach(card => {
                card.textContent = ''; // Esconde o emoji novamente
                card.classList.remove('flipped');
            });
            flippedCards = [];
        }, 1000);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
