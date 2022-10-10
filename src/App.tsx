import { useEffect, useState } from "react";
import { atom, atomFamily, useRecoilValue, useRecoilCallback } from "recoil";
import { deck } from "./initialization/makeDeck";
import { tableaus } from "./initialization/initGameColSets";
import { Tableau } from "./features/tableaus/Tableau";
import { Stock } from "./features/stockPiles/Stock";
import { Waste } from "./features/stockPiles/Waste";

function App() {
  return (
    <div className="App" style={{ display: "flex", width: "100%" }}>
      {/* <div>
        <Stock stockPile={stockPile} setStockPile={setStockPile} />
        <Waste stockPile={stockPile} setStockPile={setStockPile} />
      </div> */}

      <div className="gameColumns" style={{ display: "flex", width: "100%" }}>
        {tableaus.map((tableau, index) => {
          return <Tableau id={index} tableauSet={tableau} key={index} />;
        })}
      </div>
    </div>
  );
}

export default App;
