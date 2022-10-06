import { atomFamily, useRecoilState } from "recoil";

type TableauType = {
  cardRef: string | null;
};

const tableauAtom = atomFamily<TableauType, number>({
  key: "tableau",
  default: {
    cardRef: null,
  },
  effects: (id: number) => [
    ({ setSelf, onSet, node }) => {
      setSelf({
        cardRef: `${node.key}`,
      });

      onSet((tableau) => {
        console.log(tableau);
      });
    },
  ],
});

export const Tableau = ({ id }: { id: number }) => {
  const [tableau, setTableau] = useRecoilState(tableauAtom(id));

  return <>{tableau.cardRef} </>;
};

// <div className="column" key={"ColIndex-" + colIndex}>
//   <CardSet
//     cardSet={set}
//     setParent={null}
//     cardIndex={0}
//     thisColIndex={colIndex}
//     key={"ColIndex-" + colIndex}
//   />
// </div>;
