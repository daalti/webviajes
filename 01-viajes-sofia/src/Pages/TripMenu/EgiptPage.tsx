import { useLocation, useNavigate } from "react-router-dom";
import "./EgiptPage.css";
import { FC } from "react";
import { MenuButton } from "../../modules/Menu/components/MenuButton";
import { Menu } from "../../modules/Menu/components/Menu";

export const EgiptPage: FC = () => {
  const location = useLocation();
  const { image, prevPath } = location.state;
  const navigate = useNavigate();

  const handleMenuButtonClick = (): void => {
    navigate(prevPath);
  };

  return (
    <>
      <div className="full-image-view">
        <img
          src={image.src}
          alt={image.alt}
          className="full-image"
          onClick={() => navigate(prevPath)}
        />
      </div>
      <MenuButton onChangeMenu={handleMenuButtonClick} menuOpen={false} />
      <Menu menuOpen={false} />
    </>
  );
};
