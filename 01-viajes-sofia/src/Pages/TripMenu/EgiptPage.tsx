import "./EgiptPage.css";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuButton } from "../../modules/Menu/components/MenuButton";
import { Menu } from "../../modules/Menu/components/Menu";
import imagesData from "../../assets/data/egipt_images.json";

export const EgiptPage: FC = () => {
  const location = useLocation();
  const { image, prevPath } = location.state;
  const navigate = useNavigate();

  const handleMenuButtonClick = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(prevPath);
  };

  return (
    <>
      <div className="scroll-container">
        <div className="full-image-view">
          <img
            src={image.src}
            alt={image.alt}
            className="full-image"
            onClick={() => navigate(prevPath)}
          />
        </div>
      </div>

      <section className="images-container">
        {imagesData.images.map((img, index) => (
          <img key={`col1-${index}`} src={img.src} alt={img.alt} />
        ))}
      </section>
      <MenuButton onChangeMenu={handleMenuButtonClick} menuOpen={false} />
      <Menu menuOpen={false} />
    </>
  );
};
