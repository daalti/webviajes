import { useEffect, useRef, useState } from "react";
import "./TripMenu.css";

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
  const autoScrollRef = useRef<NodeJS.Timeout>();
  const isScrollingRef = useRef(false);
  const resetScrollTimeout = useRef<NodeJS.Timeout>();
  const isAutoScrolling = useRef(false);
  const initialAutoScroll = useRef(true);
  const [filterButton, setFilterButton] = useState(false);

  const startAutoScroll = (): void => {
    if (!isScrollingRef.current) {
      isAutoScrolling.current = true;
      const scrollInterval = setInterval(() => {
        window.scrollBy({
          top: 1.15, // Reduced from 10 to 1 pixel
          behavior: "smooth",
        });
      }, 20); // Reduced from 40 to 20ms for smoother motion
      autoScrollRef.current = scrollInterval;
    }
  };
  const stopAutoScroll = (): void => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      isAutoScrolling.current = false;
    }
  };

  useEffect(() => {
    const handleUserInteraction = (): void => {
      if (isAutoScrolling.current) {
        isScrollingRef.current = true;
        stopAutoScroll();

        if (resetScrollTimeout.current) {
          clearTimeout(resetScrollTimeout.current);
        }

        resetScrollTimeout.current = setTimeout(() => {
          isScrollingRef.current = false;
          startAutoScroll();
        }, 5000);
      }
    };

    const handleScroll = (): void => {
      const scrolled = window.scrollY;
      const viewportHeight = window.innerHeight;
      const columns = document.querySelectorAll(".trip-column");
      const container = document.querySelector(".trip-menu") as HTMLElement;

      if (!isAutoScrolling.current) {
        handleUserInteraction();
      }

      const tallColumns = Array.from(columns).filter(
        (_, index) => index % 2 !== 0
      );
      const shortColumns = Array.from(columns).filter(
        (_, index) => index % 2 === 0
      );

      const tallHeight = tallColumns[0].scrollHeight;
      const shortHeight = shortColumns[0].scrollHeight;
      const heightDiff = tallHeight - shortHeight;

      container.style.height = `${shortHeight}px`;

      const maxScroll = shortHeight - viewportHeight;
      const scrollProgress = Math.min(scrolled / maxScroll, 1);

      columns.forEach((column, index) => {
        if (index % 2 !== 0) {
          (column as HTMLElement).style.transform = `translateY(${
            -heightDiff * scrollProgress
          }px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleUserInteraction);
    window.addEventListener("touchmove", handleUserInteraction);

    // Initial auto-scroll
    if (initialAutoScroll.current) {
      initialAutoScroll.current = false;
      setTimeout(startAutoScroll, 5000);
    }

    return (): void => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      stopAutoScroll();
      if (resetScrollTimeout.current) {
        clearTimeout(resetScrollTimeout.current);
      }
    };
  }, []);

  return (
    <section className={`trip-menu ${menuOpen ? "trip-menu-open" : ""}`}>
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
      <button
        className="filter-button"
        onClick={() => setFilterButton(!filterButton)}
      >
        FILTER TRIP
      </button>
    </section>
  );
};
