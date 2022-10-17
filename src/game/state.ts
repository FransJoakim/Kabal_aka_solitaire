import { atom, atomFamily } from "recoil";
import { remainingDeck } from "./init";

const defaultValue = {
  name: "empty",
  subsidiary: null,
  value: 0,
  color: null,
  suite: null,
};

export const cardAtom = atomFamily<Card, string>({
  key: "card",
  default: defaultValue,
});

export const stockState = atom<Card[]>({
  key: "stock",
  default: remainingDeck,
});

export const wasteState = atom<Waste>({
  key: "waste",
  default: [],
});
