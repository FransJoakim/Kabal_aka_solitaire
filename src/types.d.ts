type Card = {
  value?: number;
  rank?: string;
  suite?: string;
  color?: string;
  name: string;
  subsidiary: null | string | Card;
  turned?: boolean;
};
