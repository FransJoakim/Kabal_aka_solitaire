import { useRecoilState } from "recoil";
import { useDrop } from "react-dnd";
import { cardAtom } from "../game/state";
import { Card } from "./Card";
import { useMoveCard } from "../game/useMoveCard";

export const CardSet = ({
  name,
  parentName,
  context,
  index,
  areaIndex,
}: {
  name: string;
  parentName: string;
  context: string;
  index: number;
  areaIndex: number;
}) => {
  const [card, setCard] = useRecoilState(cardAtom(name));
  const moveCardFunction = useMoveCard(setCard);

  const commonRules = (movedCard: Card) => {
    if (card.subsidiary) return false;
    if (movedCard.name === card.name) return false;
    return true;
  };

  let typeSpecificRules: (movedCard: Card) => boolean;
  if (context === "tableau") {
    typeSpecificRules = (movedCard) => {
      if (movedCard.value === null) return false;
      if (movedCard.value + 1 !== card.value) return false;
      if (movedCard.color === card.color) return false;
      return true;
    };
  } else if (context === "foundation") {
    typeSpecificRules = (movedCard) => {
      if (movedCard.value === null) return false;
      if (movedCard.value - 1 !== card.value) return false;
      if (movedCard.subsidiary) return false;
      if (movedCard.suite !== card.suite) return false;
      return true;
    };
  }

  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: "card",
      canDrop: (item) => {
        return typeSpecificRules(item.movedCard) && commonRules(item.movedCard);
      },
      drop: (item: DnD_Interface) =>
        moveCardFunction(item.movedCard.name, item.parentName),
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [card, parentName]
  );

  return (
    <div ref={drop}>
      <Card
        card={card}
        parentName={parentName}
        key={"card_" + card.name}
        context={context}
        index={index + 1}
        areaIndex={areaIndex}
      />
      {card.subsidiary && (
        <CardSet
          //@ts-ignore
          name={card.subsidiary}
          parentName={card.name}
          key={"cardSet_" + card.name}
          context={context}
          index={index + 1}
          areaIndex={areaIndex}
        />
      )}
    </div>
  );
};
