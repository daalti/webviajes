import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import imagesData from "../../../assets/data/images.json";

interface Filter {
  title: string;
  checked: boolean;
}

interface Image {
  id: number;
  title: string;
  src: string;
  alt: string;
  selected: boolean;
}

interface FilterContextType {
  filtersTitle: Filter[];
  setFiltersTitle: (
    filters: Filter[] | ((prevFilters: Filter[]) => Filter[])
  ) => void;
  reorderedImages: Image[];
  isTransitioning: boolean;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const TripFilterProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const trips = Array.from(
    new Set(
      imagesData.images.map((img) =>
        JSON.stringify({
          id: img.id,
          title: img.title,
        })
      )
    )
  )
    .map((item) => JSON.parse(item))
    .sort((a, b) => a.id - b.id);

  const [filtersTitle, setFiltersTitle] = useState<Filter[]>(
    trips.map((trip) => ({ title: trip.title, checked: false }))
  );

  const [reorderedImages, setReorderedImages] = useState<Image[]>(
    imagesData.images.map((img) => ({ ...img, selected: true }))
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isFirstRecordedImages = useRef(true);

  useEffect(() => {
    setIsTransitioning(true);

    const checkedTitles = filtersTitle
      .filter((filter) => filter.checked)
      .map((filter) => filter.title);

    const hasCheckedFilters = checkedTitles.length > 0;
    const newOrder = imagesData.images.map((img) => ({
      ...img,
      selected: hasCheckedFilters ? checkedTitles.includes(img.title) : true,
    }));

    if (isFirstRecordedImages.current) {
      isFirstRecordedImages.current = false;
      setReorderedImages([
        ...newOrder.filter((img) => img.selected),
        ...newOrder.filter((img) => !img.selected),
      ]);
      setIsTransitioning(false);
      return;
    }

    // Clear with fast fade out
    setReorderedImages([]);

    // Set new images with slower fade in
    const timer = setTimeout(() => {
      setReorderedImages([
        ...newOrder.filter((img) => img.selected),
        ...newOrder.filter((img) => !img.selected),
      ]);

      // Reset transition state after images are set
      const fadeTimer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);

      return (): void => clearTimeout(fadeTimer);
    }, 300);

    return (): void => clearTimeout(timer);
  }, [filtersTitle]);

  return (
    <FilterContext.Provider
      value={{
        filtersTitle,
        setFiltersTitle,
        reorderedImages,
        isTransitioning,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useTripFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a TripFilterProvider");
  }
  return context;
};
