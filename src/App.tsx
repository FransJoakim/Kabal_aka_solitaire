import { tableaus } from "./game/init";
import { Tableau } from "./features/Tableau";
import { Stock } from "./features/Stock";
import { Waste } from "./features/Waste";
import { Foundation } from "./features/Foundation";

function App() {
  return (
    <div className="flex-col w-full">
      <div className="flex w-full justify-between">
        <div className="flex">
          <Stock />
          <Waste />
        </div>

        <div className="flex">
          {[1, 2, 3, 4].map((id, index) => (
            <Foundation id={id} key={index} />
          ))}
        </div>
      </div>

      <div className="flex w-full justify-center space-x-4">
        {tableaus.map((tableau, index) => {
          return <Tableau id={index} tableauSet={tableau} key={index} />;
        })}
      </div>
    </div>
  );
}

export default App;
