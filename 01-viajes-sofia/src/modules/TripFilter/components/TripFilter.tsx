import "./TripFilter.css";
import { TripFilterMenu } from "./TripFilterMenu";

interface Props {
  menuOpen: boolean;
  filterButton: boolean;
  setFilterButton: (value: boolean) => void;
}

export const TripFilter: React.FC<Props> = ({
  menuOpen,
  filterButton,
  setFilterButton,
}: Props) => {
  return (
    <>
      {!filterButton && (
        <div className="filter-button-wrapper">
          <div
            className={`filter-button-container ${
              menuOpen ? "filter-button-container-open" : ""
            }`}
          >
            <button
              className="filter-button"
              onClick={() => setFilterButton(!filterButton)}
            >
              FILTER TRIP
            </button>
          </div>
        </div>
      )}
      <TripFilterMenu filterButton={filterButton} />
    </>
  );
};
