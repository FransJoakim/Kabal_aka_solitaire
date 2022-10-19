import { useDrop } from "react-dnd";
import { useRecoilState } from "recoil";
import { cardAtom } from "../game/state";
import { CardSet } from "../components/CardSet";
import { useMoveCard } from "../game/useMoveCard";

export const Foundation = ({ id }: { id: number }) => {
  const [foundation, setFoundation] = useRecoilState(
    cardAtom(`foundation__${id}`)
  );
  const moveCardFunction = useMoveCard(setFoundation);

  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: "card",
      canDrop: (item) => {
        const isEmpty = foundation.subsidiary
          ? false
          : true && item.movedCard.value === 1;
        return isEmpty;
      },
      drop: (item: DnD_Interface) => {
        moveCardFunction(item.movedCard.name, item.parentName);
      },
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [foundation]
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
          marginBottom: "-200px",
          borderRadius: "0.7rem",
          width: "138px",
          height: "200px",
        }}
      />
      {foundation.subsidiary && (
        <CardSet
          //@ts-ignore
          name={foundation.subsidiary}
          parentName={`foundation__${id}`}
          context="foundation"
          index={1}
          areaIndex={id}
          key={foundation.name}
        />
      )}
    </div>
  );
};
