const suites = [
  { suite: "spades", color: "black" },
  { suite: "clubs", color: "black" },
  { suite: "hearts", color: "red" },
  { suite: "diamonds", color: "red" },
];

const makeCard = (suite, value) => {
  let rank;
  if (value === 1) {
    rank = "ace";
  } else if (value === 11) {
    rank = "jack";
  } else if (value === 12) {
    rank = "queen";
  } else if (value === 13) {
    rank = "king";
  } else {
    rank = value.toString();
  }
  return {
    value,
    rank,
    suite: suite.suite,
    color: suite.color,
    name: `${rank}_of_${suite.suite}`,
    subsidiary: null,
    turned: false,
  };
};

const makeDeck = () => {
  const deck = [];
  for (let i = 1; i <= 13; i++) {
    suites.forEach((suite) => {
      deck.push(makeCard(suite, i));
    });
  }
  return deck;
};

const randomizeDeck = (deck) => {
  deck.forEach((card) => (card.deckOrder = Math.random()));
  deck.sort((a, b) => a.deckOrder - b.deckOrder);
  deck.forEach((card) => delete card.deckOrder);
  return deck;
};

export const deck = randomizeDeck(makeDeck());

// export const cardNames = deck.map((card) => card.name);
