import { useEffect, useRef, useState, useLayoutEffect } from "react";

export const useAutoScroll = (
  menuOpen: boolean,
  filterButton: boolean,
  isAutoScollStopped: boolean
): void => {
  const autoScrollRef = useRef<NodeJS.Timeout>();
  const isScrollingRef = useRef(false);
  const resetScrollTimeout = useRef<NodeJS.Timeout>();
  const isAutoScrolling = useRef(false);
  const initialAutoScroll = useRef(true);
  const [filterButtonStatus, setFilterButtonStatus] = useState(false);

  // Store constant values
  const dimensionsRef = useRef({
    viewportHeight: 0,
    tallHeight: 0,
    shortHeight: 0,
    heightDiff: 0,
    maxScroll: 0,
  });

  // Calculate constants once on mount
  useLayoutEffect(() => {
    const viewportHeight = window.innerHeight;
    console.log(viewportHeight);

    const columns = document.querySelectorAll(".trip-column");
    const container = document.querySelector(".trip-menu") as HTMLElement;

    const tallColumns = Array.from(columns).filter(
      (_, index) => index % 2 !== 0
    );
    const shortColumns = Array.from(columns).filter(
      (_, index) => index % 2 === 0
    );

    const tallHeight = tallColumns[0].scrollHeight;
    const shortHeight = shortColumns[0].scrollHeight;

    dimensionsRef.current = {
      viewportHeight,
      tallHeight,
      shortHeight,
      heightDiff: tallHeight - shortHeight,
      maxScroll: shortHeight - viewportHeight,
    };

    container.style.height = `${shortHeight}px`;
  }, []);

  const startAutoScroll = (): void => {
    // If user is scrolling or menu/filter is open, do nothing
    if (isScrollingRef.current || menuOpen || filterButton) return;

    isAutoScrolling.current = true;
    const scrollInterval = setInterval(() => {
      window.scrollBy({
        top: 1.15, // Reduced from 10 to 1 pixel
        behavior: "smooth",
      });
    }, 20); // Reduced from 40 to 20ms for smoother motion
    autoScrollRef.current = scrollInterval;
  };

  const stopAutoScroll = (): void => {
    clearInterval(autoScrollRef.current);
    isAutoScrolling.current = false;
  };

  const handleUserInteraction = (): void => {
    isScrollingRef.current = true;
    stopAutoScroll();

    if (resetScrollTimeout.current) {
      clearTimeout(resetScrollTimeout.current);
    }

    resetScrollTimeout.current = setTimeout(() => {
      isScrollingRef.current = false;
      startAutoScroll();
    }, 5000);
  };

  const handleScroll = (): void => {
    const scrolled = window.scrollY;
    const columns = document.querySelectorAll(".trip-column-x");
    const columnsY = document.querySelectorAll(".trip-column");
    const scrollProgress = Math.min(
      scrolled / dimensionsRef.current.maxScroll,
      1
    );

    columns.forEach((column, index) => {
      if (index % 2 !== 0) {
        {
          (column as HTMLElement).style.transform = `translateY(${
            -dimensionsRef.current.heightDiff * scrollProgress
          }px) `;
        }
      }
    });

    columnsY.forEach((column, index) => {
      if (filterButton && (index === 1 || index === 0)) {
        (column as HTMLElement).style.transform = `translateX(-200px)`;
      } else if (!filterButton && (index === 1 || index === 0)) {
        (column as HTMLElement).style.transform = `translateX(0px)`;
      }
      if (filterButton && (index === 3 || index === 2)) {
        (column as HTMLElement).style.transform = `translateX(200px)`;
      } else if (!filterButton && (index === 3 || index === 2)) {
        (column as HTMLElement).style.transform = `translateX(0px)`;
      }
    });
  };

  useEffect(() => {
    if (isAutoScollStopped) {
      stopAutoScroll();
    }

    if (filterButton) {
      setFilterButtonStatus(true);
      handleScroll();
      stopAutoScroll();
    }

    if (!filterButton && filterButtonStatus) {
      setFilterButtonStatus(false);
      handleScroll();
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleUserInteraction);
    window.addEventListener("touchmove", handleUserInteraction);
    window.addEventListener("click", handleUserInteraction);

    // Initial auto-scroll
    if (initialAutoScroll.current) {
      initialAutoScroll.current = false;
      setTimeout(startAutoScroll, 5000);
    }

    return (): void => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      window.removeEventListener("click", handleUserInteraction);
      stopAutoScroll();
      if (resetScrollTimeout.current) {
        clearTimeout(resetScrollTimeout.current);
      }
    };
  }, [filterButton, menuOpen, isAutoScollStopped]);
};
