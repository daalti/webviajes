import "./MenuItem.css";

export type MenuItemProp = {
  href: string;
  title: string;
  image: string;
};

export const MenuItem: React.FC<MenuItemProp> = ({
  href,
  title,
  image,
}: MenuItemProp) => {
  return (
    <li className="menu-item">
      <a href={href} className="menu-item-link">
        <h3 className="menu-item-title">{title}</h3>
        <img src={image} alt={title} className="menu-item-image" />
      </a>
    </li>
  );
};
