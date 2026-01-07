// 1) Data for the deck
const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let deck = [];        // full deck of 52 cards
let playerHand = [];  // your 5 cards
let opponentHand = []; // opponent's 5 cards

// DOM elements
const playerHandDiv = document.getElementById("player-hand");
const opponentHandDiv = document.getElementById("opponent-hand");
const playerScoreP = document.getElementById("player-score");
const opponentScoreP = document.getElementById("opponent-score");
const messageP = document.getElementById("message");
const dealBtn = document.getElementById("dealBtn");

// 2) Create a fresh deck
function createDeck() {
    const newDeck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            newDeck.push({
                suit,
                rank,
                value: getCardValue(rank)
            });
        }
    }
    return newDeck;
}

// Simple values so we can compare hands
function getCardValue(rank) {
    if (rank === "A") return 14;
    if (rank === "K") return 13;
    if (rank === "Q") return 12;
    if (rank === "J") return 11;
    return Number(rank); // "2".."10"
}

// 3) Shuffle the deck (Fisher–Yates)
function shuffleDeck(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // 0..i
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// 4) Deal 5 cards to each player
function dealHands() {
    playerHand = [];
    opponentHand = [];

    for (let i = 0; i < 5; i++) {
        playerHand.push(deck.pop());
        opponentHand.push(deck.pop());
    }
}

// 5) Render hands to the page
function renderHand(container, hand) {
    container.innerHTML = ""; // clear previous cards

    hand.forEach((card) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        // red suits
        if (card.suit === "♥" || card.suit === "♦") {
            cardDiv.classList.add("red");
        }

        // very simple layout: rank top & bottom, suit middle
        cardDiv.innerHTML = `
      <span>${card.rank}</span>
      <span>${card.suit}</span>
      <span>${card.rank}</span>
    `;

        container.appendChild(cardDiv);
    });
}

// 6) Calculate total score for a hand
function getHandScore(hand) {
    return hand.reduce((sum, card) => sum + card.value, 0);
}

// 7) Decide winner and show message
function showWinner() {
    const playerScore = getHandScore(playerHand);
    const opponentScore = getHandScore(opponentHand);

    playerScoreP.textContent = `Score: ${playerScore}`;
    opponentScoreP.textContent = `Score: ${opponentScore}`;

    if (playerScore > opponentScore) {
        messageP.textContent = "You win! 🏆";
    } else if (playerScore < opponentScore) {
        messageP.textContent = "Opponent wins 😤";
    } else {
        messageP.textContent = "It's a tie! 🤝";
    }
}

// 8) Main flow when we click "Deal"
function startRound() {
    // If deck is low on cards, create & shuffle a fresh one
    if (deck.length < 10) {
        deck = createDeck();
        shuffleDeck(deck);
    }

    dealHands();
    renderHand(playerHandDiv, playerHand);
    renderHand(opponentHandDiv, opponentHand);
    showWinner();
}

// Attach click listener
dealBtn.addEventListener("click", startRound);

// Optional: start with a shuffled deck ready
deck = createDeck();
shuffleDeck(deck);
