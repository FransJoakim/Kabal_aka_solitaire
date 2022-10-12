import { useRecoilValue } from "recoil";
import { useDrag } from "react-dnd";
import { wasteState } from "../../game/state";

export const Waste = () => {
  const waste = useRecoilValue(wasteState);

  return (
    <div
      style={{
        margin: "1rem",
      }}
    >
      {waste.map((hand, handIndex, wasteArray) => {
        return (
          <div key={"hand" + handIndex}>
            {hand.map((card, cardIndex, handArray) => {
              const isTopCard =
                handIndex + 1 === wasteArray.length &&
                cardIndex + 1 === handArray.length;
              // if (isTopCard) console.log("top card:", card);
              return (
                <Card
                  card={card}
                  key={card.name}
                  isTopCard={isTopCard}
                  handIndex={handIndex}
                  cardIndex={cardIndex}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

function Card({
  card,
  isTopCard,
  handIndex,
  cardIndex,
}: {
  card: Card;
  isTopCard: boolean;
  handIndex: number;
  cardIndex: number;
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: {
      movedCard: card,
      parentName: null,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      draggable={isTopCard ? true : false}
      className="cardImg"
      src={`./PNG-cards/${card.name}.png`}
      key={cardIndex}
      style={{
        marginLeft: `${cardIndex * 25}px`,
        marginTop: `${-(handIndex * 0.5 + cardIndex * 1.5)}px`,
        position: "absolute",
        border: "0.1px solid gray",
        borderRadius: "8px",
        width: "150px",
        height: "180px",
        opacity: isDragging ? "0" : "100",
      }}
    />
  );
}
