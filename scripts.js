const cardsContainer = document.querySelector(".cards-container");

const numberOfCards = 16;

window.addEventListener("load", playGame);

document.querySelector("#replay").addEventListener("click", playGame);

function playGame() {
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
  
  cardsContainer.innerHTML = "";
  document.querySelector(".modal").classList.remove("shown");
  
  generateCards(cardsContainer, numberOfCards, cardOptions);
  
  const cards = document.querySelectorAll(".card");
  
  let playerScore = 0;
  let previousCard = "";
  
  cards.forEach((clickedCard) => clickedCard.addEventListener("click", playCard));
  
  function playCard(e) {
    const currentCard = e.currentTarget;
    currentCard.classList.add("shown");
    
    if (!previousCard) {
      previousCard = currentCard;
    } else {
      const cardA = previousCard;
      const cardB = currentCard;

      if (checkEqualCards(cardA, cardB)) {
        playerScore++;
        fixCards(cardA, cardB);
      } else {
          resetCards(cardA, cardB);
      }

      previousCard = "";

      if (playerScore == numberOfCards / 2) {
        finishGame();
      }
    }
  }

  function checkEqualCards(a, b) {
    let [nameA, nameB] = [...[a, b].map((i) => i.querySelector(".card-name"))];

    return nameA.textContent == nameB.textContent && nameA != nameB;
  }

  function resetCards(a, b) {
    [a, b].forEach((i) => i.classList.remove("shown"));
  }

  function fixCards(a, b) {
    if (a.classList.contains("shown") && b.classList.contains("shown")) {
      [a, b].forEach(i => i.removeEventListener("click", playCard));
    }
  }

  function finishGame() {
    const modal = document.querySelector(".modal");

    modal.classList.add("shown");
  }
}

function generateCards(container, number, options) {
  for (let i = 0; i < number; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    
    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const cardName = getCardName(options);
    getCardContent(cardName).forEach((item) => {
      cardContent.appendChild(item);
    });

    card.appendChild(cardContent);
    container.appendChild(card);
  }
}

function getCardName(options) {
  const randomIndex = Math.floor(Math.random() * options.length);
  const randomOption = options[randomIndex];

  const currentCards = Array.from(
    document.querySelectorAll(".card-name")
  );

  const cardNamesUsed = currentCards.map(item => item.textContent);

  if (cardNamesUsed.map(item => item.toLowerCase())
    .includes(randomOption)) {
    options.splice(options.indexOf(randomOption), 1);
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
