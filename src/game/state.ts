import { atom, atomFamily } from "recoil";

const defaultValue = {
  name: "",
  subsidiary: null,
  value: null,
  color: null,
  suite: null,
};

export const cardAtom = atomFamily<Card, string>({
  key: "card",
  default: defaultValue,
});

export const stockState = atom<Stock>({
  key: "stock",
  default: [],
});

export const wasteState = atom<Waste>({
  key: "waste",
  default: [],
});
