import { deck } from "./deck";

const tableauArrays = [];
const tableauSets: Card[] = [];

for (let i = 1; i <= 7; i++) {
  const tableau = deck.splice(-i);
  tableauArrays.push(tableau);
}

const nestCards = (obj: Card, subObj: Card, set: Card[], baseObj: Card) => {
  if (subObj) {
    obj.subsidiary = subObj;
    //@ts-ignore
    nestCards(subObj, set.shift(), set, baseObj);
  } else {
    obj.turned = false;
  }
  return baseObj;
};

tableauArrays.forEach((set, index) => {
  const baseObj = {
    name: `tableau__${index}`,
    value: null,
    color: null,
    suite: null,
  };
  //@ts-ignore
  const nestedSet = nestCards(baseObj, set.shift(), set, baseObj);
  tableauSets.push(nestedSet);
});

export const tableaus = tableauSets;
export const remainingDeck = deck;
