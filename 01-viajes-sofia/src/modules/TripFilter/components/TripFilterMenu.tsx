import "./TripFilterMenu.css";

const trips = [
  {
    id: 1,
    title: "Trip 1",
    image: "https://via.placeholder.com/150",
    number: 5,
  },
  {
    id: 2,
    title: "Trip 2",
    image: "https://via.placeholder.com/150",
    number: 10,
  },
  {
    id: 3,
    title: "Trip 3",
    image: "https://via.placeholder.com/150",
    number: 8,
  },
  {
    id: 4,
    title: "Trip 4",
    image: "https://via.placeholder.com/150",
    number: 7,
  },
];

interface Props {
  filterButton: boolean;
}

export const TripFilterMenu: React.FC<Props> = ({ filterButton }: Props) => {
  return (
    <div
      className={`trip-filter-menu-wrapper ${filterButton ? "visible" : ""}`}
    >
      <div className="trip-filter-menu-container">
        <ul className="trip-filter-menu">
          {trips.map((trip) => (
            <li key={trip.id} className="trip-filter-menu-item">
              <button className="trip-filter-menu-button">
                <span>{trip.title}</span>
                {trip.number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
