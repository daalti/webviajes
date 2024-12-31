import { useEffect, useRef } from "react";

export const useAutoScroll = (menuOpen: boolean): void => {
  const autoScrollRef = useRef<NodeJS.Timeout>();
  const isScrollingRef = useRef(false);
  const resetScrollTimeout = useRef<NodeJS.Timeout>();
  const isAutoScrolling = useRef(false);
  const initialAutoScroll = useRef(true);

  const startAutoScroll = (): void => {
    console.log(menuOpen);
    if (!isScrollingRef.current && !menuOpen) {
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
      stopAutoScroll();
      if (resetScrollTimeout.current) {
        clearTimeout(resetScrollTimeout.current);
      }
    };
  }, []);
};
