import { useEffect } from "react";
import { useRecoilCallback, useRecoilState } from "recoil";
import { useDrop } from "react-dnd";
import { cardAtom } from "../game/state";
import { CardSet } from "../components/CardSet";
import { useMoveCard } from "../game/useMoveCard";

export const Tableau = ({
  id,
  tableauSet,
}: {
  id: number;
  tableauSet: any;
}) => {
  const [base, setBase] = useRecoilState(cardAtom(`tableau__${id}`));
  const moveCardFunction = useMoveCard(setBase);

  const nestAtom = useRecoilCallback(({ set }) => (card: Card) => {
    set(cardAtom(card.name), card);
  });

  const loopDown = (card: any) => {
    const copy = {
      ...card,
      subsidiary: card.subsidiary ? card.subsidiary.name : null,
    };
    nestAtom(copy);
    if (card.subsidiary !== null) {
      loopDown(card.subsidiary);
    }
  };

  useEffect(() => {
    loopDown(tableauSet);
  }, []);

  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: "card",
      canDrop: (item) =>
        base.subsidiary ? false : item.movedCard.rank === "king",
      drop: (item: DnD_Interface) =>
        moveCardFunction(item.movedCard.name, item.parentName),
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [base]
  );

  return (
    <div
      ref={drop}
      style={{
        width: "180px",
        height: "200px",
      }}
      draggable={false}
    >
      <img
        className="cardImg"
        src={"./PNG-cards/empty.png"}
        draggable={false}
        style={{
          border: "0.1px solid gray",
          borderRadius: "0.7rem",
          marginBottom: "-200px",
          width: "138px",
          height: "200px",
        }}
      />
      {base.subsidiary && (
        <CardSet
          //@ts-ignore
          name={base.subsidiary}
          parentName={`tableau__${id}`}
          context="tableau"
          index={1}
          areaIndex={id}
          key={base.name}
        />
      )}
    </div>
  );
};
