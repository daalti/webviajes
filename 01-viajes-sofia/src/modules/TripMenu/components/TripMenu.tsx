import "./TripMenu.css";
import { useAutoScroll } from "../hooks/useAutoScroll";
import { TripFilter } from "../../TripFilter/components/TripFilter";
import { useFilter } from "../context/filterButtonContext";
import { useTripFilter } from "../../TripFilter/context/TripFilterContext";

interface Props {
  menuOpen: boolean;
}

export const TripMenu: React.FC<Props> = ({ menuOpen }: Props) => {
  const { filterButton, setFilterButton } = useFilter();
  useAutoScroll(menuOpen, filterButton);
  const { reorderedImages, isTransitioning } = useTripFilter();

  const column1 = reorderedImages.filter((_, index) => index % 4 === 0);
  const column2 = reorderedImages.filter((_, index) => index % 4 === 1);
  const column3 = reorderedImages.filter((_, index) => index % 4 === 2);
  const column4 = reorderedImages.filter((_, index) => index % 4 === 3);
  console.log(reorderedImages);

  return (
    <>
      <section
        className={`trip-menu ${
          menuOpen && !filterButton ? "trip-menu-open" : ""
        } ${filterButton ? "trip-menu-filtered" : ""}
        ${isTransitioning ? "trip-menu-transition" : ""}`}
      >
        <div className="trip-column-x">
          <div className="trip-column">
            {column1.map((img, index) => (
              <img
                key={`col1-${index}`}
                className={`image-small ${
                  !img.selected ? "image-small-blur" : ""
                }`}
                src={img.src}
                alt={img.alt}
              />
            ))}
          </div>
        </div>
        <div className="trip-column-x">
          <div className="trip-column">
            {column2.map((img, index) => (
              <img
                key={`col2-${index}`}
                className={`image-large ${
                  !img.selected ? "image-large-blur" : ""
                }`}
                src={img.src}
                alt={img.alt}
              />
            ))}
          </div>
        </div>
        <div className="trip-column-x">
          <div className="trip-column">
            {column3.map((img, index) => (
              <img
                key={`col3-${index}`}
                className={`image-small ${
                  !img.selected ? "image-small-blur" : ""
                }`}
                src={img.src}
                alt={img.alt}
              />
            ))}
          </div>
        </div>
        <div className="trip-column-x">
          <div className="trip-column">
            {column4.map((img, index) => (
              <img
                key={`col4-${index}`}
                className={`image-large ${
                  !img.selected ? "image-large-blur" : ""
                }`}
                src={img.src}
                alt={img.alt}
              />
            ))}
          </div>
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
