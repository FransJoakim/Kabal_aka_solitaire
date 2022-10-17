type Card = {
  value: number | null;
  rank?: string;
  suite: string | null;
  color: string | null;
  name: string;
  subsidiary?: null | string | Card;
  turned?: boolean;
  deckOrder?: number;
};

type Hand = Card[];
type Waste = Hand[];

interface DnD_Interface {
  movedCard: Card;
  parentName: string;
}
