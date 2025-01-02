import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
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

  useEffect(() => {
    const checkedTitles = filtersTitle
      .filter((filter) => filter.checked)
      .map((filter) => filter.title);

    const hasCheckedFilters = checkedTitles.length > 0;

    const newOrder = imagesData.images.map((img) => ({
      ...img,
      selected: hasCheckedFilters ? checkedTitles.includes(img.title) : true,
    }));

    setReorderedImages([
      ...newOrder.filter((img) => img.selected),
      ...newOrder.filter((img) => !img.selected),
    ]);
  }, [filtersTitle]);

  return (
    <FilterContext.Provider
      value={{ filtersTitle, setFiltersTitle, reorderedImages }}
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
