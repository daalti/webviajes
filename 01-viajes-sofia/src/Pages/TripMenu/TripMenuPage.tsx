import { useState } from "react";
import { MenuButton } from "./../../modules/Menu/components/MenuButton";
import { Menu } from "./../../modules/Menu/components/Menu";
import { TripMenu } from "../../modules/TripMenu/components/TripMenu";
import { useFilter } from "../../modules/TripMenu/context/filterButtonContext";

export const TripMenuPage: React.FC = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { filterButton, setFilterButton } = useFilter();

  const handleMenuButtonClick = (): void => {
    if (filterButton) {
      setFilterButton(false);
    } else {
      setMenuOpen(!menuOpen);
    }
  };

  return (
    <>
      <TripMenu menuOpen={menuOpen} />
      <MenuButton onChangeMenu={handleMenuButtonClick} menuOpen={menuOpen} />
      <Menu menuOpen={menuOpen} />
    </>
  );
};
