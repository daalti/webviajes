import "./TripFilterMenu.css";
import imagesData from "../../../assets/data/images.json";
import { useTripFilter } from "../context/TripFilterContext";

const idCounts = imagesData.images.reduce((acc, img) => {
  acc[img.id] = (acc[img.id] || 0) + 1;
  return acc;
}, {} as Record<number, number>);

const trips = Array.from(
  new Set(
    imagesData.images.map((img) =>
      JSON.stringify({
        id: img.id,
        title: img.title,
        count: idCounts[img.id],
      })
    )
  )
)
  .map((item) => JSON.parse(item))
  .sort((a, b) => a.id - b.id);

interface Props {
  filterButton: boolean;
}
interface Filter {
  title: string;
  checked: boolean;
}

export const TripFilterMenu: React.FC<Props> = ({ filterButton }: Props) => {
  const { filtersTitle, setFiltersTitle } = useTripFilter();

  const handlerFilterChange = (title: string): void => {
    setFiltersTitle((prevFilters: Filter[]) =>
      prevFilters.map((filter: Filter) =>
        filter.title === title
          ? { ...filter, checked: !filter.checked }
          : filter
      )
    );
    console.log(filtersTitle);
  };

  return (
    <div
      className={`trip-filter-menu-wrapper ${filterButton ? "visible" : ""}`}
    >
      <div className="trip-filter-menu-container">
        <ul className="trip-filter-menu">
          {trips.map((trip) => (
            <li key={trip.id} className="trip-filter-menu-item">
              <button
                className="trip-filter-menu-button"
                onClick={() => handlerFilterChange(trip.title)}
              >
                <span>{trip.title}</span>
                {trip.count}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
