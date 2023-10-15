import React from "react";
import { BiImageAdd } from "react-icons/bi";
import { HiUsers, HiOutlineTrash } from "react-icons/hi";
import {
  PiGithubLogo,
  PiTwitterLogo,
  PiLinkedinLogoLight,
} from "react-icons/pi";
// import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { BsSunFill } from "react-icons/bs";
import AsideItem from "./AsideItem";

interface IMenuItems {
  id: number | string;
  icon: JSX.Element;
  title: string;
  link?: string;
}

const menuItems: IMenuItems[] = [
  {
    id: 1,
    icon: <BiImageAdd />,
    title: "Export image",
  },
  {
    id: 2,
    icon: <HiUsers />,
    title: "Live collaboration",
  },
  {
    id: 3,
    icon: <HiOutlineTrash />,
    title: "Reset the canvas",
  },
];

const socialMedia: IMenuItems[] = [
  {
    id: 4,
    icon: <PiGithubLogo />,
    title: "Github",
    link: import.meta.env.VITE_REACT_APP_GITHUB_URL,
  },
  {
    id: 5,
    icon: <PiTwitterLogo />,
    title: "Twitter",
    link: import.meta.env.VITE_REACT_APP_TWITTER_URL,
  },
  {
    id: 6,
    icon: <PiLinkedinLogoLight />,
    title: "LinkedIn",
    link: import.meta.env.VITE_REACT_APP_LINKEDIN_URL,
  },
];

const AsideMenu: React.FC = () => {
  return (
    <>
      <aside className="w-[14rem] bg-[#1e1e1e] absolute top-[85%] left-2 rounded-md py-4 px-2 flex flex-col gap-2 z-20">
        {menuItems.map((item) => {
          return (
            <AsideItem key={item.id}>
              {item.icon}
              {item.title}
            </AsideItem>
          );
        })}
        <div className="h-[1px] bg-[#4a4a4a] my-1" />
        {socialMedia.map((item) => {
          return (
            <AsideItem key={item.id} link={item.link}>
              {item.icon}
              {item.title}
            </AsideItem>
          );
        })}
        <div className="h-[1px] bg-[#4a4a4a] my-1" />
        <button className="text-gray-400 list-none inline-flex items-center justify-start gap-2 font-assistant cursor-pointer hover:bg-[#2b2e31ce] px-2 py-1.5 rounded-lg">
          <BsSunFill className="text-sm" /> Light mode
        </button>
      </aside>
    </>
  );
};

export default AsideMenu;
