import { useRecoilState, useSetRecoilState } from "recoil";
import { useDrag, useDrop } from "react-dnd";

export const Card = ({
  card,
  parentName,
}: {
  card: Card;
  parentName: string;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: {
      movedCard: card,
      parentName,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      className="cardImg"
      src={`./PNG-cards/${card.turned ? "backside" : card.name}.png`}
      style={{
        height: "200px",
        marginTop: "-150px",
        // display: isDragging ? "none" : "",
      }}
    />
  );
};
