import React from "react";

interface IAsideItemProps {
  children: React.ReactNode;
  style?: string;
  link?: string;
}

const AsideItem: React.FC<IAsideItemProps> = ({ children, style, link }) => {
  return (
    <>
      {link ? (
        <a
          href={link}
          target="_blank"
          className={`dark:text-gray-400 text-gray-800 ${style} list-none inline-flex items-center justify-start gap-2 font-assistant cursor-pointer dark:hover:bg-[#2b2e31ce] hover:bg-[#b4b6b8ce] px-2 py-1.5 rounded-lg`}
        >
          {children}
        </a>
      ) : (
        <li
          className={`dark:text-gray-400 text-gray-800 ${style} list-none inline-flex items-center justify-start gap-2 font-assistant cursor-pointer dark:hover:bg-[#2b2e31ce] hover:bg-[#b4b6b8ce] px-2 py-1.5 rounded-lg`}
        >
          {children}
        </li>
      )}
    </>
  );
};

export default AsideItem;
