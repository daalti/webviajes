import { MenuButton } from "./../../modules/Menu/components/MenuButton";
import { Menu } from "./../../modules/Menu/components/Menu";
import { useState, useRef } from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

export const LandingPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVideoClicked, setIsVideoClicked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseMove = (e: React.MouseEvent): void => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMenuButtonClick = (): void => {
    setMenuOpen(!menuOpen);
  };

  const handleJourneyClick = (): void => {
    navigate("/viajes");
  };

  const handleVideoClick = (): void => {
    setIsVideoClicked(true);
    setTimeout(() => {
      if (videoRef?.current) {
        videoRef.current.muted = false;
      }
    }, 300);
  };

  const handleVideoMute = (): void => {
    if (videoRef?.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const handleVideoClose = (): void => {
    setIsVideoClicked(false);
    if (videoRef?.current) {
      videoRef.current.muted = true;
    }
  };

  return (
    <>
      <main
        className={`landing-main ${menuOpen ? "landing-main-menu-open" : ""}`}
      >
        <section
          className={`landing-section-left ${
            isVideoClicked ? "landing-section-left-visible" : ""
          }`}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={handleVideoClick}
        >
          {/* Video added here */}
          <video
            ref={videoRef}
            className={`landing-video ${
              isVideoClicked ? "landing-video-fullscreen" : ""
            }`}
            autoPlay
            loop
            muted
          >
            <source src="./src/assets/data/Egipto/0106.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {isHovering && !isVideoClicked && (
            <span
              className="showreel-text"
              style={{
                left: `${mousePosition.x - 100}px`,
                top: `${mousePosition.y}px`,
              }}
            >
              showreel
            </span>
          )}
        </section>
        <section
          className={`landing-section-right ${
            isVideoClicked ? "landing-section-right-hidden" : ""
          }`}
        >
          <h1>
            !BIENVENIDO
            <p>A LOS VIAJES</p>
            <p>DE SOFIA</p>
            <p>Y DANI!</p>
          </h1>
          <p className="landing-paragraph">Descubre los mejores destinos y</p>
          <p className="landing-paragraph">
            experiencias de viaje con nosotros.
          </p>
          <button className="landing-button" onClick={handleJourneyClick}>
            VIAJES
          </button>
        </section>
      </main>
      {isVideoClicked && (
        <div className="video-button-container">
          <button className="close-video-button" onClick={handleVideoClose}>
            CLOSE
          </button>
          <button className="muted-vide-button" onClick={handleVideoMute}>
            MUTE
          </button>
        </div>
      )}
      <MenuButton onChangeMenu={handleMenuButtonClick} menuOpen={menuOpen} />
      <Menu menuOpen={menuOpen} />
    </>
  );
};
