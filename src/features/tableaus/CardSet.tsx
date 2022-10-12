import { useRecoilState, useSetRecoilState, useRecoilCallback } from "recoil";
import { useDrop } from "react-dnd";
import { cardAtom } from "../../game/state";
import { Card } from "./Card";

interface DnD_Interface {
  movedCard: Card;
  parentName: string;
}

export const CardSet = ({
  name,
  parentName,
}: {
  name: string;
  parentName: string;
}) => {
  const [card, setCard] = useRecoilState(cardAtom(name));

  const detachCard = useRecoilCallback(({ set }) => (parentName: string) => {
    set(cardAtom(parentName), (parent) => ({ ...parent, subsidiary: null }));
  });

  const moveCard = (movedCard: string, parentName: string) => {
    if (card.subsidiary === null) {
      detachCard(parentName);
      setCard((c) => ({ ...c, subsidiary: movedCard }));
    }
  };

  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: "card",
      canDrop: (item) => {
        if (item.movedCard.value === null) return false;
        return card.subsidiary
          ? false
          : true &&
              item.movedCard.name !== card.name &&
              item.movedCard.value + 1 === card.value &&
              item.movedCard.color !== card.color;
      },
      drop: (item: DnD_Interface) =>
        moveCard(item.movedCard.name, item.parentName),
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [card]
  );

  return (
    <div ref={drop} style={{ border: canDrop ? "5px solid green" : "" }}>
      <Card card={card} parentName={parentName} key={"card_" + card.name} />
      {card.subsidiary && (
        <CardSet
          //@ts-ignore
          name={card.subsidiary}
          parentName={card.name}
          key={"cardSet_" + card.name}
        />
      )}
    </div>
  );
};
