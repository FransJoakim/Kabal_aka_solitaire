import React from "react";

export const Hand = ({ stockPile, setStockPile }) => {
  const pickCard = () => {
    stockPile.waste.pop();
  };

  return (
    <div
      style={{
        width: "180px",
        height: "200px",
        margin: "1rem",
      }}
      onClick={pickCard}
    >
      {stockPile.hand.map((card, index) => {
        return (
          <img
            className="cardImg"
            src={"./PNG-cards/backside.png"}
            key={index}
            style={{
              marginLeft: `${-index * 1.1}px`,
              marginTop: `${-index * 0.2}px`,
              position: "absolute",
              border: "0.1px solid gray",
              borderRadius: "8px",
            }}
          />
        );
      })}
    </div>
  );
};
