import {
  selectorFamily,
  atomFamily,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { tableauAtom, cardAtom } from "./Tableau";
import { deck } from "../../initialization/makeDeck";

const cardSelector = selectorFamily<Card, string>({
  key: "cardSelector",
  get:
    (name) =>
    //@ts-ignore
    ({ get }) => {
      return get(cardAtom(name));
    },
});

export const Card = ({ name }: { name: string }) => {
  const card = useRecoilValue(cardSelector(name));
  //console.log(card);

  return (
    <div>
      <img
        // ref={drop}
        className="cardImg"
        src={`./PNG-cards/${card.turned ? "backside" : card.name}.png`}
        // key={card.name + "-IMG"}
        style={{
          height: "200px",
          marginTop: "-150px",
          // border: canDrop ? "3px solid green" : "",
          // display: isDragging ? "none" : "",
        }}
      />
      {
        //@ts-ignore
        card.subsidiary && (
          //@ts-ignore
          <Card name={card.subsidiary} key={card.name} />
        )
      }
    </div>
  );
};
