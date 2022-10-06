import React from "react";

export const Stock = ({ stockPile, setStockPile }) => {
  const pickCardsFromStock = () => {
    const hand = stockPile.stock.splice(-3);
    stockPile.waste.push(hand);
    setStockPile({
      ...stockPile,
    });
  };

  return (
    <div
      style={{
        width: "180px",
        height: "200px",
        margin: "1rem",
      }}
      onClick={pickCardsFromStock}
    >
      {stockPile.stock.map((card, index) => (
        <img
          className="cardImg"
          src={"./PNG-cards/backside.png"}
          key={index}
          style={{
            marginLeft: `${-index * 0.4}px`,
            marginTop: `${-index * 0.6}px`,
            position: "absolute",
            border: "0.1px solid gray",
            borderRadius: "8px",
          }}
        />
      ))}
    </div>
  );
};
