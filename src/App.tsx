import { useState } from "react";
import { tableaus, remainingDeck } from "./initialization/initGameColSets";
import { CardSet } from "./features/tableaus/CardSet";
import { Stock } from "./features/stockPiles/Stock";
import { Waste } from "./features/stockPiles/Waste";
import { Tableau } from "./features/tableaus/Tableau";

function App() {
  const [stockPile, setStockPile] = useState({
    stock: remainingDeck,
    waste: [],
  });

  return (
    <div style={{ display: "flex" }}>
      {/* <div>
        <Stock stockPile={stockPile} setStockPile={setStockPile} />
        <Waste stockPile={stockPile} setStockPile={setStockPile} />
      </div> */}

      <div className="gameColumns">
        {[1, 2, 3, 4, 5, 6, 7].map((initialCardNr) => {
          return <Tableau id={initialCardNr} key={initialCardNr} />;
        })}
      </div>
    </div>
  );
}

export default App;
