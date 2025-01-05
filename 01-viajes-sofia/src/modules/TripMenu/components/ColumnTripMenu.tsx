import "./ColumnTripMenu.css";

interface Image {
  id: number;
  title: string;
  src: string;
  alt: string;
  selected: boolean;
}

interface Props {
  reorderedImages: Image[];
  handleImageClick: (img: Image, e: React.MouseEvent<HTMLImageElement>) => void;
}

export const ColumnTripMenu: React.FC<Props> = ({
  reorderedImages,
  handleImageClick,
}: Props) => {
  return (
    <>
      {[0, 1, 2, 3].map((columnIndex) => (
        <div key={`column-${columnIndex}`} className="trip-column-x">
          <div className="trip-column">
            {reorderedImages
              .filter((_, index) => index % 4 === columnIndex)
              .map((img, index) => (
                <img
                  key={`col${columnIndex}-${index}`}
                  className={`${
                    columnIndex % 2 === 0 ? "image-small" : "image-large"
                  } ${
                    !img.selected
                      ? `${
                          columnIndex % 2 === 0
                            ? "image-small-blur"
                            : "image-large-blur"
                        }`
                      : ""
                  }`}
                  src={img.src}
                  alt={img.alt}
                  onClick={(e) => handleImageClick(img, e)}
                />
              ))}
          </div>
        </div>
      ))}
    </>
  );
};
