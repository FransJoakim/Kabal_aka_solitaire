import { randomizedDeck } from "./makeDeck";

const tableauArrays = [];
const tableauSets = [];

for (let i = 1; i <= 7; i++) {
  const tableau = randomizedDeck.splice(-i);
  tableauArrays.push(tableau);
}

const nestCards = (obj, subObj, set, baseObj) => {
  if (subObj) {
    obj.subsidiary = subObj;
    nestCards(subObj, set.shift(), set, baseObj);
  } else {
    obj.turned = false;
  }
  return baseObj;
};

tableauArrays.forEach((set) => {
  const baseObj = {
    name: "empty",
    turned: false,
  };
  const nestedSet = nestCards(baseObj, set.shift(), set, baseObj);
  tableauSets.push(nestedSet);
});

export const tableaus = tableauSets;
export const remainingDeck = randomizedDeck;
