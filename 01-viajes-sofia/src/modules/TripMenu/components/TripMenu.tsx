import "./TripMenu.css";
import { useAutoScroll } from "../hooks/useAutoScroll";
import { TripFilter } from "../../TripFilter/components/TripFilter";
import { useState } from "react";

interface Image {
  src: string;
  alt: string;
}

interface Props {
  column1: Image[];
  column2: Image[];
  column3: Image[];
  column4: Image[];
  menuOpen: boolean;
}

export const TripMenu: React.FC<Props> = ({
  column1,
  column2,
  column3,
  column4,
  menuOpen,
}: Props) => {
  const [filterButton, setFilterButton] = useState(false);
  useAutoScroll(menuOpen, filterButton);

  return (
    <>
      <section
        className={`trip-menu ${menuOpen ? "trip-menu-open" : ""} ${
          filterButton ? "trip-menu-filtered" : ""
        }`}
      >
        <div className="trip-column">
          {column1.map((img, index) => (
            <img
              key={`col1-${index}`}
              className="image-small"
              src={img.src}
              alt={img.alt}
            />
          ))}
        </div>
        <div className="trip-column">
          {column2.map((img, index) => (
            <img
              key={`col2-${index}`}
              className="image-large"
              src={img.src}
              alt={img.alt}
            />
          ))}
        </div>
        <div className="trip-column">
          {column3.map((img, index) => (
            <img
              key={`col3-${index}`}
              className="image-small"
              src={img.src}
              alt={img.alt}
            />
          ))}
        </div>
        <div className="trip-column">
          {column4.map((img, index) => (
            <img
              key={`col4-${index}`}
              className="image-large"
              src={img.src}
              alt={img.alt}
            />
          ))}
        </div>
      </section>
      <TripFilter
        menuOpen={menuOpen}
        filterButton={filterButton}
        setFilterButton={setFilterButton}
      />
    </>
  );
};
