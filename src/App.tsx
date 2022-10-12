import { useEffect, useState } from "react";
import { atom, atomFamily, useRecoilValue, useRecoilCallback } from "recoil";
import { tableaus } from "./game/init";
import { Tableau } from "./features/tableaus/Tableau";
import { Stock } from "./features/stockPiles/Stock";
import { Waste } from "./features/stockPiles/Waste";

function App() {
  return (
    <div className="App" style={{ display: "flex", width: "100%" }}>
      <div className="stockPiles">
        <Stock />
        <Waste />
      </div>

      <div className="gameColumns" style={{ display: "flex", width: "100%" }}>
        {tableaus.map((tableau, index) => {
          return <Tableau id={index} tableauSet={tableau} key={index} />;
        })}
      </div>
    </div>
  );
}

export default App;
