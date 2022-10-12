import { useEffect } from "react";
import { cardAtom, stockState, wasteState } from "../../game/state";
import { remainingDeck } from "../../game/init";
import { useRecoilState, useRecoilCallback } from "recoil";

export const Stock = () => {
  const [stock, setStock] = useRecoilState(stockState);
  const [waste, setWaste] = useRecoilState(wasteState);

  const setAtom = useRecoilCallback(({ set }) => (card: Card) => {
    set(cardAtom(card.name), card);
  });

  useEffect(() => {
    const cardNames: string[] = [];
    remainingDeck.forEach((card: Card) => {
      cardNames.push(card.name);
      setAtom(card);
    });
    setStock(cardNames);
  }, []);

  const pickCardsFromStock = () => {
    const tempStock = [...stock];
    const tempWaste = [...waste];

    const hand = tempStock.splice(-3);
    tempWaste.push(hand);

    setWaste(tempWaste);
    setStock(tempStock);
  };

  return (
    <div
      style={{
        width: "180px",
        height: "200px",
        margin: "1rem",
      }}
      onClick={pickCardsFromStock}
    >
      {stock.map((card: string, index: number) => (
        <img
          className="cardImg"
          src={"./PNG-cards/backside.png"}
          key={index}
          style={{
            marginLeft: `${-index * 0.4}px`,
            marginTop: `${-index * 0.6}px`,
            position: "absolute",
            border: "0.1px solid gray",
            borderRadius: "28px",
            width: "150px",
            height: "200px",
          }}
        />
      ))}
    </div>
  );
};
