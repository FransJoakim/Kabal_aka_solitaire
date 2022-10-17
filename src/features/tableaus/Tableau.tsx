import { useEffect } from "react";
import { useRecoilValue, useRecoilCallback, useRecoilState } from "recoil";
import { useDrop } from "react-dnd";
import { cardAtom } from "../../game/state";
import { CardSet } from "./CardSet";
import { wasteState } from "../../game/state";

export const Tableau = ({
  id,
  tableauSet,
}: {
  id: number;
  tableauSet: any;
}) => {
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

  return (
    <div>
      <img
        className="cardImg"
        src={`./PNG-cards/empty.png`}
        key={`tableau__${id}`}
        style={{
          height: "200px",
          marginBottom: `-53px`,
        }}
      />
      <CardColumn id={id} tableauSet={tableauSet} key={id} />
    </div>
  );
};

const CardColumn = ({ id, tableauSet }: { id: number; tableauSet: any }) => {
  const [tableau, setTableau] = useRecoilState(cardAtom(`tableau__${id}`));
  const [waste, setWaste] = useRecoilState(wasteState);

  const removeCardFromWaste = () => {
    const tempwaste = waste.map((hand) => [...hand]);
    if (tempwaste[tempwaste.length - 1].length > 0) {
      tempwaste[tempwaste.length - 1].pop();
    } else {
      tempwaste.pop();
      tempwaste[tempwaste.length - 1].pop();
    }
    setWaste(tempwaste);
  };

  const detachCardFromTableau = useRecoilCallback(
    ({ set }) =>
      (parentName: string) => {
        set(cardAtom(parentName), (parent) => ({
          ...parent,
          subsidiary: null,
        }));
      }
  );

  const moveCard = (movedCard: string, parentName: string | null) => {
    console.log("parent", parentName);
    console.log(movedCard);
    if (parentName) {
      detachCardFromTableau(parentName);
    } else {
      removeCardFromWaste();
    }
    setTableau((base) => ({ ...base, subsidiary: movedCard }));
  };

  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: "card",
      canDrop: (item) => item.movedCard.rank === "king",
      drop: (item: DnD_Interface) =>
        moveCard(item.movedCard.name, item.parentName),
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [tableau]
  );

  return (
    <>
      {tableau.subsidiary && (
        <CardSet
          name={tableauSet.subsidiary.name}
          parentName={`tableau__${id}`}
          key={tableauSet.name}
        />
      )}
      {!tableau.subsidiary && (
        <img
          ref={drop}
          className="cardImg"
          src={`./PNG-cards/empty.png`}
          key={`tableau__${id}`}
          style={{
            height: "200px",
            marginTop: "-220px",
          }}
        />
      )}
    </>
  );
};
