import "./TripMenu.css";
import { useAutoScroll } from "../hooks/useAutoScroll";
import { TripFilter } from "../../TripFilter/components/TripFilter";
import { useFilter } from "../context/filterButtonContext";
import { useTripFilter } from "../../TripFilter/context/TripFilterContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ColumnTripMenu } from "./ColumnTripMenu";

interface Props {
  menuOpen: boolean;
}

interface Image {
  id: number;
  title: string;
  src: string;
  alt: string;
  selected: boolean;
}

export const TripMenu: React.FC<Props> = ({ menuOpen }: Props) => {
  const navigate = useNavigate();
  const { filterButton, setFilterButton } = useFilter();
  const [isAutoScollStopped, setIsAutoScollStopped] = useState(false);
  useAutoScroll(menuOpen, filterButton, isAutoScollStopped);
  const { reorderedImages, isTransitioning } = useTripFilter();

  const handleImageClick = (img: Image): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsAutoScollStopped(true);
    navigate(`/${img.title}`, {
      state: {
        image: img,
        prevPath: window.location.pathname,
      },
    });
  };

  return (
    <>
      <section
        className={`trip-menu ${
          menuOpen && !filterButton ? "trip-menu-open" : ""
        } ${filterButton ? "trip-menu-filtered" : ""}
        ${isTransitioning ? "trip-menu-transition" : ""}`}
      >
        <ColumnTripMenu
          reorderedImages={reorderedImages}
          handleImageClick={handleImageClick}
        />
      </section>
      <TripFilter
        menuOpen={menuOpen}
        filterButton={filterButton}
        setFilterButton={setFilterButton}
      />
    </>
  );
};
