import { useLocation, useNavigate } from "react-router-dom";
import "./EgiptPage.css";

import { FC } from "react";

export const EgiptPage: FC = () => {
  const location = useLocation();
  const { image, prevPath } = location.state;
  const navigate = useNavigate();

  return (
    <div className="full-image-view">
      <img
        src={image.src}
        alt={image.alt}
        className="full-image"
        onClick={() => navigate(prevPath)}
      />
    </div>
  );
};
