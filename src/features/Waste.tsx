import { useRecoilValue } from "recoil";
import { useDrag } from "react-dnd";
import { wasteState } from "../game/state";

export const Waste = () => {
  const waste = useRecoilValue(wasteState);

  return (
    <div
      style={{
        margin: "1rem",
      }}
    >
      {waste.map((card: any, index: number, array: any) => {
        const isTopCard = index + 1 === array.length;
        const handIndex = index / 3;
        const cardIndex = index % 3;
        return (
          <Card
            card={card}
            isTopCard={isTopCard}
            index={index}
            handIndex={handIndex}
            cardIndex={cardIndex}
            key={index}
          />
        );
      })}
    </div>
  );
};

function Card({
  card,
  isTopCard,
  index,
  handIndex,
  cardIndex,
}: {
  card: Card;
  isTopCard: boolean;
  index: number;
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
      ref={isTopCard ? drag : null}
      draggable={isTopCard ? true : false}
      className="cardImg"
      src={`./PNG-cards/${card.name}.png`}
      key={index}
      style={{
        marginLeft: `${cardIndex * 25}px`,
        marginTop: `${-(handIndex * 0.6 + cardIndex * 1.5)}px`,
        position: "absolute",
        border: "0.1px solid gray",
        borderRadius: "8px",
        width: "140px",
        height: "190px",
        opacity: isDragging ? "0" : "100",
      }}
    />
  );
}
