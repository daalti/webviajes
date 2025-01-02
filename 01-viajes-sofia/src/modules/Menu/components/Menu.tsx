import "./Menu.css";
import { MenuItem } from "./MenuItem";
import { type MenuItemProp } from "./MenuItem";
import { useState, useRef, useEffect } from "react";
import { useFilter } from "../../TripMenu/context/filterButtonContext";

type Props = {
  menuOpen: boolean;
};

export const Menu: React.FC<Props> = ({ menuOpen }: Props) => {
  const [offsetX, setOffsetX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const { filterButton } = useFilter();

  useEffect(() => {
    if (containerRef.current) {
      // OffsetWidth or scrollWidth:
      // - offsetWidth is the visible width
      // - scrollWidth is the total width of the element (including overflow)
      setContainerWidth(containerRef.current.scrollWidth);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    console.log("handleMouseMove");
    // Current mouse position (in pixels from the left)
    const mouseX = e.clientX;
    // Screen width
    const screenWidth = window.innerWidth;

    // Calculate mouse position as a percentage:
    // 0 --> completely to the left
    // 1 --> completely to the right
    const adjustedMouseX = mouseX - 250;
    const mouseRatio = adjustedMouseX / (screenWidth - 250);

    // "Range" of movement the container can have.
    // For example, if the container measures containerWidth and the screen screenWidth,
    // the maximum displacement (to the left) could be:
    const maxScroll = containerWidth - screenWidth + 250;

    // Calculate the translation you want:
    // multiply by -1 to "move" the container in the opposite direction,
    // because if your cursor is to the right, you want to see the end.
    const newOffsetX = -mouseRatio * maxScroll;

    setOffsetX(newOffsetX);
  };

  const menuItems: MenuItemProp[] = [
    {
      href: "/",
      title: "HOME",
      image:
        "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F1500x794%2F2b8065b129%2Fhome-desktop.png&w=640&q=80",
    },
    {
      href: "/destinos",
      title: "WORK",
      image:
        "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F3000x1588%2F08cb60c343%2Fwork-desktop-2024-july.jpg&w=640&q=80",
    },
    {
      href: "/contacto",
      title: "EXPERTISE",
      image:
        "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F2880x1700%2F40cbfcf93d%2Fservices-desktop.jpg&w=640&q=80",
    },
    {
      href: "/about",
      title: "ABOUT",
      image:
        "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F1500x794%2Fea17d43c84%2Fabout-desktop.png&w=640&q=80",
    },
    {
      href: "/about2",
      title: "ABOUT",
      image:
        "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F1500x794%2Fea17d43c84%2Fabout-desktop.png&w=640&q=80",
    },
    {
      href: "/about3",
      title: "ABOUT",
      image:
        "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F1500x794%2Fea17d43c84%2Fabout-desktop.png&w=640&q=80",
    },
  ];

  return (
    <nav className={`menu ${menuOpen && !filterButton ? "menu-open" : ""}`}>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="menu-items"
        style={{
          transform: `translateX(${offsetX}px)`,
        }}
      >
        <ul className="menu-items-container">
          {menuItems.map((item) => (
            <MenuItem
              key={item.href}
              href={item.href}
              title={item.title}
              image={item.image}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
};
