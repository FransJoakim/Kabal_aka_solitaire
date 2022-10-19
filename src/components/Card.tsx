import { useDrag } from "react-dnd";
import { useSetRecoilState } from "recoil";
import { cardAtom } from "../game/state";

export const Card = ({
  card,
  parentName,
  context,
  index,
  areaIndex,
}: {
  card: Card;
  parentName: string;
  context: string;
  index: number;
  areaIndex: number;
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

  return (
    <img
      ref={card.turned ? null : drag}
      draggable={card.turned ? false : true}
      onClick={turnCard}
      src={`./PNG-cards/${card.turned ? "backside" : card.name}.png`}
      style={{
        height: "200px",
        width: context === "foundation" ? "138px" : `${137 + index / 1.5}px`,
        marginTop:
          context === "foundation"
            ? `-${200 + index / 8}px`
            : card.turned
            ? `-${165 - index}px`
            : `-${155 - index}px`,
        display: isDragging ? "none" : "block",
        zIndex: 1,
        marginLeft:
          context === "foundation" ? (index / 10) * (areaIndex / 3) : "",
        // : (index / 8) * areaIndex,
        marginRight:
          context === "foundation" ? "" : index * 10 * (areaIndex * 30),
        filter:
          context === "foundation"
            ? `drop-shadow(${(4 - areaIndex) / 6}mm -0.2mm 0.2mm #A9A9A9)`
            : `drop-shadow(${(4 - areaIndex) / 5}mm -0.2mm 0.2mm #A9A9A9)`,
      }}
    />
  );
};
