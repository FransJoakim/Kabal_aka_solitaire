import { useRecoilCallback } from "recoil";
import { cardAtom, wasteState } from "./state";

export const useMoveCard = (setCardState: any) => {
  const detachFromTableau = useRecoilCallback(
    ({ set }) =>
      (parentName: string) => {
        set(cardAtom(parentName), (parent) => ({
          ...parent,
          subsidiary: null,
        }));
      }
  );

  const detachFromWaste = useRecoilCallback(({ set }) => () => {
    set(wasteState, (waste) => {
      const tempwaste = [...waste];
      tempwaste.pop();
      return tempwaste;
    });
  });

  return (movedCard: string, parentName: string | null) => {
    if (parentName) {
      detachFromTableau(parentName);
    } else {
      detachFromWaste();
    }
    setCardState((card: Card) => ({ ...card, subsidiary: movedCard }));
  };
};
