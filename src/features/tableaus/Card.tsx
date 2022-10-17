import { useDrag } from "react-dnd";
import { useSetRecoilState } from "recoil";
import { cardAtom } from "../../game/state";

export const Card = ({
  card,
  parentName,
}: {
  card: Card;
  parentName: string;
}) => {
  const setCard = useSetRecoilState(cardAtom(card.name));

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "card",
      item: {
        movedCard: card,
        parentName,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [card]
  );

  function turnCard() {
    if (card.turned && !card.subsidiary) {
      setCard({ ...card, turned: false });
    }
  }

  const imgSrc = `./PNG-cards/${card.turned ? "backside" : card.name}.png`;

  return (
    <img
      ref={card.turned ? null : drag}
      draggable={card.turned ? false : true}
      className="cardImg"
      onClick={turnCard}
      src={imgSrc}
      style={{
        height: "200px",
        marginTop: "-150px",
        display: isDragging ? "none" : "block",
      }}
    />
  );
};
