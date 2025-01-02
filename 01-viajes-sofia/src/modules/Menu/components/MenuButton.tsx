import "./MenuButton.css";
import { useFilter } from "../../TripMenu/context/filterButtonContext";

type Props = {
  onChangeMenu: () => void;
  menuOpen: boolean;
};

export const MenuButton: React.FC<Props> = ({
  onChangeMenu,
  menuOpen,
}: Props) => {
  const { filterButton } = useFilter();
  return (
    <button
      className={`menu-button ${
        menuOpen || filterButton ? "menu-button-open" : ""
      }`}
      onClick={onChangeMenu}
    ></button>
  );
};
