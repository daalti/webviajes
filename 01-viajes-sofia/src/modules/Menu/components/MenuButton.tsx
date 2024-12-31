import "./MenuButton.css";

type Props = {
  onChangeMenu: () => void;
  menuOpen: boolean;
};

export const MenuButton: React.FC<Props> = ({
  onChangeMenu,
  menuOpen,
}: Props) => {
  return (
    <button
      className={`menu-button ${menuOpen ? "menu-button-open" : ""}`}
      onClick={onChangeMenu}
    ></button>
  );
};
