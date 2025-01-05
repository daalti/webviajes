import "./EgiptPage.css";
import { FC, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuButton } from "../../modules/Menu/components/MenuButton";
import { Menu } from "../../modules/Menu/components/Menu";
import imagesData from "../../assets/data/egipt_images.json";

export const EgiptPage: FC = () => {
  const location = useLocation();
  const { image, prevPath } = location.state;
  const navigate = useNavigate();

  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleMenuButtonClick = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(prevPath);
  };

  const handleImageClick = (imgSrc: string): void => {
    setSelectedImg(imgSrc);
    dialogRef.current?.showModal();
  };

  const handleDialogClose = (): void => {
    dialogRef.current?.close();
    setSelectedImg(null);
  };

  return (
    <>
      <div className="scroll-container">
        <div className="full-image-view">
          <img src={image.src} alt={image.alt} className="full-image" />
        </div>
      </div>

      <section className="images-container">
        {imagesData.map((img, index) => (
          <img
            key={`col1-${index}`}
            src={img.src}
            alt={img.alt}
            onClick={() => handleImageClick(img.src)}
          />
        ))}
      </section>

      <dialog
        ref={dialogRef}
        className="image-dialog"
        onClick={handleDialogClose}
      >
        {selectedImg && <img src={selectedImg} alt="Selected" />}
      </dialog>
      <MenuButton onChangeMenu={handleMenuButtonClick} menuOpen={false} />
      <Menu menuOpen={false} />
    </>
  );
};
