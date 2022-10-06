import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

export const CardSet = ({ cardSet, setParent, cardIndex, thisColIndex }) => {
  const [card, setCard] = useState(cardSet);

  const moveSet = (movedCard, setMovedCardParent) => {
    setMovedCardParent((parent) => ({ ...parent, subsidiary: null }));
    card.subsidiary = movedCard;
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: {
      movedCard: card,
      setMovedCardParent: setParent,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ canDrop }, drop] = useDrop(() => ({
    accept: "card",
    canDrop: () => (card.subsidiary ? false : true),
    drop: (item) => moveSet(item.movedCard, item.setMovedCardParent),
    collect: (monitor) => ({
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <>
      <div ref={drag} key={card.name + "-DIV"}>
        <img
          ref={drop}
          className="cardImg"
          src={`./PNG-cards/${card.turned ? "backside" : card.name}.png`}
          key={card.name + "-IMG"}
          style={{
            marginTop: "-150px",
            marginBottom: `${card.name === "empty" ? -50 : 0}`,
            border: canDrop ? "3px solid green" : "",
            display: isDragging ? "none" : "",
          }}
        />
        {card.subsidiary && (
          <CardSet
            cardSet={card.subsidiary}
            setParent={setCard}
            cardIndex={cardIndex + 1}
            key={card.name + "-COMP"}
            thisColIndex={thisColIndex}
          />
        )}
      </div>
    </>
  );
};
