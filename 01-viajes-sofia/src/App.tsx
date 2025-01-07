import "./App.css";

import { TripMenuPage } from "./Pages/TripMenu/TripMenuPage";
import { FilterProvider } from "./modules/TripMenu/context/filterButtonContext";
import { TripFilterProvider } from "./modules/TripFilter/context/TripFilterContext";
import { EgiptPage } from "./Pages/TripMenu/EgiptPage";
import { LandingPage } from "./Pages/LandingPage/LandingPage";
import { Routes, Route } from "react-router-dom";

function App(): JSX.Element {
  return (
    <FilterProvider>
      <TripFilterProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/viajes" element={<TripMenuPage />} />
          <Route path="/:title" element={<EgiptPage />} />
        </Routes>
      </TripFilterProvider>
    </FilterProvider>
  );
}

export default App;
