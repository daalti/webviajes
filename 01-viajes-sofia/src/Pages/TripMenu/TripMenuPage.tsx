import { useState } from "react";
import { MenuButton } from "./../../modules/Menu/components/MenuButton";
import { Menu } from "./../../modules/Menu/components/Menu";
import { TripMenu } from "../../modules/TripMenu/components/TripMenu";
import { useFilter } from "../../modules/TripMenu/context/filterButtonContext";

export const TripMenuPage: React.FC = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { filterButton, setFilterButton } = useFilter();

  const images = {
    column1: [
      {
        src: "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F3000x2000%2F2df66c129a%2Fivypark-2020.jpg&w=640&q=80",
        alt: "Ivy Park",
      },
      {
        src: "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F1667x2500%2F8423a27ac6%2Fxbionic-terraskin-trail-running.jpg&w=640&q=80",
        alt: "XBionic Trail",
      },
      {
        src: "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F3525x2080%2F2fed1cd354%2Fakris-bag.jpg&w=640&q=80",
        alt: "Akris Bag",
      },
      {
        src: "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F1667x2500%2F0d04d36265%2Fxbionic-cycling.jpg&w=640&q=80",
        alt: "XBionic Cycling",
      },
    ],
    column2: [
      {
        src: "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F4186x2628%2F1a34fbdae8%2Fbia-website_cover_desktop_suitsupply_2024.jpg&w=640&q=80",
        alt: "Suit Supply",
      },
      {
        src: "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F1280x1919%2Fa3d8a518c2%2Fhibo-en-hani-from-somalia-foto-in-2019-gemaakt-in-kenia.webp&w=640&q=80",
        alt: "Hibo en Hani",
      },
      {
        src: "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F5200x6500%2F2ce74aa9d0%2Felden-ring.jpg&w=640&q=80",
        alt: "Elden Ring",
      },
      {
        src: "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F2827x2120%2F75f5634236%2Fbloom-wolf.jpeg&w=640&q=80",
        alt: "Bloom Wolf",
      },
    ],
    column3: [
      {
        src: "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F3000x1860%2F46618c5c21%2Fpolaroid-cover.png&w=640&q=80",
        alt: "Polaroid",
      },
      {
        src: "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F2624x3500%2Fc02a8355ce%2Froger-vivier-express-campaign.jpg&w=640&q=80",
        alt: "Roger Vivier",
      },
      {
        src: "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F3500x2333%2F4e696c923d%2Frare-marriages-the-balvenie.jpg&w=640&q=80",
        alt: "The Balvenie",
      },
      {
        src: "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F2399x3000%2F077f39e7c7%2Face-andtate-portrait.jpg&w=640&q=80",
        alt: "Ace and Tate",
      },
    ],
    column4: [
      {
        src: "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F3000x1700%2F2f08e9f0a8%2Fland-of-ride-9.jpg&w=640&q=80",
        alt: "Land of Ride",
      },
      {
        src: "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F2560x1707%2F9f78e6c0b7%2Fskiing_zermatt_fw20-21_0501_c-1-1-scaled.jpeg&w=640&q=80",
        alt: "Skiing Zermatt",
      },
      {
        src: "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F4500x2550%2F49ad9d4a3a%2Fbezier-reveal.jpg&w=640&q=80",
        alt: "Bezier",
      },
      {
        src: "https://www.buildinamsterdam.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F158533%2F3000x1701%2F26fdc87df8%2Fcover.jpg&w=640&q=80",
        alt: "Cover",
      },
    ],
  };

  const handleMenuButtonClick = (): void => {
    if (filterButton) {
      setFilterButton(false);
    } else {
      setMenuOpen(!menuOpen);
    }
  };

  return (
    <>
      <TripMenu {...images} menuOpen={menuOpen} />
      <MenuButton onChangeMenu={handleMenuButtonClick} menuOpen={menuOpen} />
      <Menu menuOpen={menuOpen} />
    </>
  );
};
