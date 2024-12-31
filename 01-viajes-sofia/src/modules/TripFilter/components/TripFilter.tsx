interface Props {
  onChangeFilter: () => void;
  filterOpen: boolean;
}

export const TripFilter: React.FC<Props> = ({
  onChangeFilter,
  filterOpen,
}: Props) => {
  return (
    <button
      className={`trip-filter ${filterOpen ? "trip-filter-open" : ""}`}
      onClick={onChangeFilter}
    ></button>
  );
};
