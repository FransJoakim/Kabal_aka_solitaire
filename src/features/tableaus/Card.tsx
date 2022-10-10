import { useRecoilState, useSetRecoilState } from "recoil";
import { useDrag, useDrop } from "react-dnd";
import { cardAtom } from "./Tableau";

interface DnD_Interface {
  movedCard: string;
  parentName: string;
}

export const Card = ({
  name,
  parentName,
}: {
  name: string;
  parentName: string;
}) => {
  const [card, setCard] = useRecoilState(cardAtom(name));
  const [parentCard, setParent] = useRecoilState(cardAtom(parentName));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: {
      movedCard: name,
      parentName,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // parentName is supposed to point to the parent of the moved card, and needed to be fetched within here... not at the top
  const moveCard = (movedCard: string, parentName: string) => {
    console.log(parentCard);
    setParent((parent) => ({ ...parent, subsidiary: card.name }));
    setCard({ ...card, subsidiary: movedCard });
  };

  const [{ canDrop }, drop] = useDrop(() => ({
    accept: "card",
    canDrop: () => (card.subsidiary ? false : true),
    drop: (item: DnD_Interface) => moveCard(item.movedCard, item.parentName),
    collect: (monitor) => ({
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drag}>
      <img
        ref={drop}
        className="cardImg"
        src={`./PNG-cards/${card.turned ? "backside" : card.name}.png`}
        // key={card.name + "-IMG"}
        style={{
          height: "200px",
          marginTop: "-150px",
          border: canDrop ? "3px solid green" : "",
          // display: isDragging ? "none" : "",
        }}
      />
      {
        //@ts-ignore
        card.subsidiary && (
          //@ts-ignore
          <Card name={card.subsidiary} parentName={card.name} key={card.name} />
        )
      }
    </div>
  );
};
