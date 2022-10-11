import { useEffect, useState } from "react";
import { atom, atomFamily, useRecoilValue, useRecoilCallback } from "recoil";
import { tableaus } from "./initialization/initGameColSets";
import { Tableau } from "./features/tableaus/Tableau";
import { StockPiles } from "./features/stockPiles/StockPiles";

function App() {
  return (
    <div className="App" style={{ display: "flex", width: "100%" }}>
      <StockPiles />

      <div className="gameColumns" style={{ display: "flex", width: "100%" }}>
        {tableaus.map((tableau, index) => {
          return <Tableau id={index} tableauSet={tableau} key={index} />;
        })}
      </div>
    </div>
  );
}

export default App;
