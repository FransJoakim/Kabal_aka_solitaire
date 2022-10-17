import { tableaus } from "./game/init";
import { Tableau } from "./features/tableaus/Tableau";
import { Stock } from "./features/stockPiles/Stock";
import { Waste } from "./features/stockPiles/Waste";
import { Foundation } from "./features/foundations/Foundation";

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

      <div style={{ display: "flex", flexDirection: "column" }}>
        {[1, 2, 3, 4].map((id) => (
          <Foundation id={id} />
        ))}
      </div>
    </div>
  );
}

export default App;
