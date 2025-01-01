import "./TripFilterMenu.css";

export const TripFilterMenu: React.FC = () => {
  return (
    <div className="trip-filter-menu-wrapper">
      <div className="trip-filter-menu-container">
        <ul className="trip-filter-menu">
          <li className="trip-filter-menu-item">Filter 1</li>
          <li className="trip-filter-menu-item">Filter 2</li>
          <li className="trip-filter-menu-item">Filter 3</li>
          <li className="trip-filter-menu-item">Filter 4</li>
        </ul>
      </div>
    </div>
  );
};
