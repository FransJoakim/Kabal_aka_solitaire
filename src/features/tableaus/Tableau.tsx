import { useEffect, useState } from "react";
import { atomFamily, useRecoilState, useRecoilCallback } from "recoil";
import { cardNames } from "../../initialization/makeDeck";
import { tableaus } from "../../initialization/initGameColSets";
import { Card } from "./Card";

export const tableauAtom = atomFamily<Card | undefined, number>({
  key: "tableau",
  default: undefined,
  effects: (id: number) => [
    ({ setSelf, onSet, node }) => {
      const { subsidiary } = tableaus[id];
      setSelf({
        ...subsidiary,
        subsidiary: null,
      });
    },
  ],
});

export const cardAtom = atomFamily({
  key: "card",
  default: {},
  effects: (cardName) => [({ setSelf }) => {}],
});

export const Tableau = ({
  id,
  tableauSet,
}: {
  id: number;
  tableauSet: any;
}) => {
  const [baseCard] = useRecoilState(tableauAtom(id));

  const nestAtom = useRecoilCallback(({ set }) => (card: Card) => {
    set(cardAtom(card.name), card);
  });

  const loopDown = (card: any) => {
    if (card.subsidiary !== null) {
      const copy = {
        ...card,
        subsidiary: card.subsidiary.name,
      };
      nestAtom(copy);
      loopDown(card.subsidiary);
    }
  };

  useEffect(() => {
    loopDown(tableauSet);
  }, []);

  return (
    <div>
      <img
        className="cardImg"
        src={`./PNG-cards/empty.png`}
        key={`Tableau__${id}`}
        style={{
          height: "200px",
          marginBottom: `-53px`,
          // ref={drop}
          // marginTop: "-150px",
          // border: canDrop ? "3px solid green" : "",
        }}
      />
      {baseCard && <Card name={baseCard.name} key={baseCard.name} />}
    </div>
  );
};
