import "./App.css";
import { TripMenuPage } from "./Pages/TripMenu/TripMenuPage";
import { FilterProvider } from "./modules/TripMenu/context/filterButtonContext";
import { TripFilterProvider } from "./modules/TripFilter/context/TripFilterContext";

function App(): JSX.Element {
  return (
    <FilterProvider>
      <TripFilterProvider>
        <TripMenuPage />
      </TripFilterProvider>
    </FilterProvider>
  );
}

export default App;
