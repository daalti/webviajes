import { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextType {
  filterButton: boolean;
  setFilterButton: (value: boolean) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [filterButton, setFilterButton] = useState(false);

  return (
    <FilterContext.Provider value={{ filterButton, setFilterButton }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
