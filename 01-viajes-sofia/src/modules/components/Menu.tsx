import "./Menu.css";
import { MenuItem } from "./MenuItem";
import { type MenuItemProp } from "./MenuItem";

type Props = {
  menuOpen: boolean;
};

export const Menu: React.FC<Props> = ({ menuOpen }: Props) => {
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
  ];

  return (
    <nav className={`menu ${menuOpen ? "menu-open" : ""}`}>
      <div className="menu-items">
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
