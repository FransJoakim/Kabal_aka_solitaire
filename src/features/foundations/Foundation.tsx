import { useState } from "react";
import { useDrop } from "react-dnd";
import { useRecoilState, useRecoilValue, useRecoilCallback } from "recoil";
import { cardAtom } from "../../game/state";
import { wasteState } from "../../game/state";
import { CardSet } from "../tableaus/CardSet";

interface DnD_Interface {
  movedCard: Card;
  parentName: string;
}

export const Foundation = ({ id }: { id: number }) => {
  const [waste, setWaste] = useRecoilState(wasteState);

  const [foundation, setFoundation] = useState(["empty"]);

  const nameofTopCard = foundation[foundation.length - 1];
  const topCard = useRecoilValue(cardAtom(nameofTopCard));
  console.log(topCard);

  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: "card",
      canDrop: (item) => {
        if (topCard.value === null) return false;
        return (
          item.movedCard.value === topCard.value + 1 &&
          (topCard.suite === null || topCard.suite === item.movedCard.suite)
        );
      },
      drop: (item: DnD_Interface) =>
        moveCard(item.movedCard.name, item.parentName),
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [topCard, waste]
  );

  const moveCard = (movedCard: string, parentName: string | null) => {
    if (parentName) {
      detachCardFromTableau(parentName);
    } else {
      removeCardFromWaste();
    }
    setFoundation([...foundation, movedCard]);
  };

  const detachCardFromTableau = useRecoilCallback(
    ({ set }) =>
      (parentName: string) => {
        set(cardAtom(parentName), (parent) => ({
          ...parent,
          subsidiary: null,
        }));
      }
  );

  const removeCardFromWaste = () => {
    const tempwaste = waste.map((hand) => [...hand]);
    if (tempwaste[tempwaste.length - 1].length > 0) {
      tempwaste[tempwaste.length - 1].pop();
    } else {
      tempwaste.pop();
      tempwaste[tempwaste.length - 1].pop();
    }
    setWaste(tempwaste);
  };

  return (
    <div
      ref={drop}
      style={{
        width: "180px",
        height: "200px",
        margin: "1rem",
      }}
      draggable={false}
    >
      {foundation.length > 0 ? (
        foundation.map((cardName: string, index: number) => (
          <img
            className="cardImg"
            src={`./PNG-cards/${cardName}.png`}
            draggable={cardName === nameofTopCard}
            key={index}
            style={{
              marginLeft: `${-index * 0.4}px`,
              marginTop: `${-index * 0.6}px`,
              position: "absolute",
              border: "0.1px solid gray",
              borderRadius: "0.7rem",
              width: "150px",
              height: "200px",
            }}
          />
        ))
      ) : (
        <img
          className="cardImg"
          src={"./PNG-cards/empty.png"}
          draggable={false}
          style={{
            border: "0.1px solid gray",
            borderRadius: "0.7rem",
            width: "150px",
            height: "200px",
          }}
        />
      )}
    </div>
  );
};
