let cardOptions = [
  "monkey",
  "lion",
  "bird",
  "cat",
  "dog",
  "fox",
  "hamster",
  "bear",
];

const numberOfCards = 16;

const cardsContainer = document.querySelector(".cards-container");

generateCards(cardsContainer, numberOfCards);

const cards = document.querySelectorAll(".card");

cards.forEach((card) => card.addEventListener("click", (e) => {
  card.classList.toggle("hidden");
}));

function generateCards(container, number) {
  for (let i = 0; i < number; i++) {
    const card = document.createElement("div");
    card.classList.add("card", "hidden");
    
    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const cardName = getCardName();
    getCardContent(cardName).forEach((item) => {
      cardContent.appendChild(item);
    });

    card.appendChild(cardContent);
    container.appendChild(card);
  }
}

function getCardName() {
  const randomIndex = Math.floor(Math.random() * cardOptions.length);
  const randomOption = cardOptions[randomIndex];

  const currentCards = Array.from(
    document.querySelectorAll(".card-name")
  );

  const cardNamesUsed = currentCards.map(item => item.textContent);

  if (cardNamesUsed.map(item => item.toLowerCase())
    .includes(randomOption)) {
    cardOptions = cardOptions.filter(
      option => option != randomOption
    );
  }
  
  return randomOption;
}

function getCardContent(name) {
  const cardImage = document.createElement("img");
  cardImage.classList.add("card-image");
  cardImage.src = `images/${name}.jpg`;
  
  const cardName = document.createElement("div");
  cardName.classList.add("card-name");
  cardName.textContent = name.charAt(0).toUpperCase() + name.slice(1);

  return [cardImage, cardName];
}
