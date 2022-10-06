import React from "react";

export const Waste = ({ stockPile, setStockPile }) => {
  const waste = stockPile.waste;

  const pickCardFromWaste = () => {
    if (waste[waste.length - 1].length > 0) {
      waste[waste.length - 1].pop();
    } else {
      waste.pop();
      waste[waste.length - 1].pop();
    }

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
    >
      {waste.map((hand, handIndex) => (
        <div onClick={pickCardFromWaste} key={"hand" + handIndex}>
          {hand.map((card, index) => (
            <img
              className="cardImg"
              src={`./PNG-cards/${card.name}.png`}
              key={index}
              style={{
                marginLeft: `${index * 25}px`,
                marginTop: `${-(handIndex * 0.5 + index * 1.5)}px`,
                position: "absolute",
                border: "0.1px solid gray",
                borderRadius: "8px",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
