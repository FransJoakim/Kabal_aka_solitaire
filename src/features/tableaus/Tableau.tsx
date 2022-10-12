import { useEffect } from "react";
import { useRecoilValue, useRecoilCallback } from "recoil";
import { cardAtom } from "../../game/state";
import { CardSet } from "./CardSet";

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
  const firstCard = useRecoilValue(cardAtom(`tableau__${id}`));

  return (
    <>
      {firstCard.subsidiary && (
        <CardSet
          name={tableauSet.subsidiary.name}
          parentName={`tableau__${id}`}
          key={tableauSet.name}
        />
      )}
    </>
  );
};
