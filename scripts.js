let options = ["monkey", "lion"];

let cards = [];

while (cards.length < 4) {
  let randomIndex = Math.floor(Math.random() * options.length);
  let randomOption = options[randomIndex];

  if (cards.includes(randomOption)) {
    options = options.filter(option => option != randomOption);
  }

  cards.push(randomOption);
}


let score = 0;

while (score < 2) {
  console.log(cards);

  let firstChoice = prompt("Type your first choice");
  let secondChoice = prompt("Type your second choice");
  if (cards[firstChoice] == cards[secondChoice]) {
    score++;

    cards = cards.filter(card => card != cards[firstChoice]);
  }
}

console.log("You won!");
