import { useState } from "react";
import "./App.css";
import { MenuButton } from "./modules/components/MenuButton";
import { Menu } from "./modules/components/Menu";

function App(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuButtonClick = (): void => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <MenuButton onChangeMenu={handleMenuButtonClick} menuOpen={menuOpen} />
      <Menu menuOpen={menuOpen} />
    </>
  );
}

export default App;
