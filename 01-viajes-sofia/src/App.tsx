import "./App.css";
import { TripMenuPage } from "./Pages/TripMenu/TripMenuPage";
import { FilterProvider } from "./modules/TripMenu/context/filterButtonContext";

function App(): JSX.Element {
  return (
    <FilterProvider>
      <TripMenuPage />
    </FilterProvider>
  );
}

export default App;
