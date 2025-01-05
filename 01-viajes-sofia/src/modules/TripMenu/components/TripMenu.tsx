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

  const [clonedImage, setClonedImage] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const handleImageClick = (
    img: Image,
    e: React.MouseEvent<HTMLImageElement>
  ): void => {
    setIsAutoScollStopped(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
    setClonedImage(img.src);

    setTimeout(() => {
      setIsFullScreen(true);
    }, 500);

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);

    setTimeout(() => {
      navigate(`/${img.title}`, {
        state: {
          image: img,
          prevPath: window.location.pathname,
        },
      });
    }, 1200);
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
        {clonedImage && (
          <img
            src={clonedImage}
            alt="Cloned view"
            className="image-clone"
            onClick={() => setClonedImage(null)}
            style={{
              position: "fixed",
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${position.width}px`,
              height: `${position.height}px`,
              ...(isFullScreen && {
                transform: `
                  translate(
                    calc(50vw - ${position.left}px - ${position.width / 2}px),
                    calc(50vh - ${position.top}px - ${position.height / 2}px)
                  )
                  scale(${Math.max(
                    window.innerWidth / position.width,
                    window.innerHeight / position.height
                  )})
                `,
              }),
            }}
          />
        )}
      </section>
      <TripFilter
        menuOpen={menuOpen}
        filterButton={filterButton}
        setFilterButton={setFilterButton}
      />
    </>
  );
};
