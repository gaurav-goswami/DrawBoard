import React from "react";
import { HiOutlineCloudDownload } from "react-icons/hi";
import { BiUndo, BiRedo, BiSolidPencil, BiCircle } from "react-icons/bi";
import { LuEraser } from "react-icons/lu";
import { RiRectangleLine } from "react-icons/ri";
import Tooltip from "../Tooltip/Tooltip";

interface IToolBarOption {
  id: number | string;
  icon: JSX.Element;
  tooltipTitle?: string;
}

const toolBarOptions: IToolBarOption[] = [
  {
    id: 1,
    icon: <BiSolidPencil />,
    tooltipTitle: "Pencil",
  },
  {
    id: 2,
    icon: <RiRectangleLine />,
    tooltipTitle: "Box",
  },
  {
    id: 3,
    icon: <BiCircle />,
    tooltipTitle: "Circle",
  },
  {
    id: 4,
    icon: <BiUndo />,
    tooltipTitle: "Undo",
  },
  {
    id: 5,
    icon: <BiRedo />,
    tooltipTitle: "Redo",
  },
  {
    id: 6,
    icon: <LuEraser />,
    tooltipTitle: "Eraser",
  },
  {
    id: 7,
    icon: <HiOutlineCloudDownload />,
    tooltipTitle: "Download",
  },
];

const ToolBar: React.FC = () => {
  return (
    <>
      <div className="w-max p-4 mx-auto my-4 flex gap-1 bg-[#262627] rounded-md h-[2.5rem] items-center justify-center">
        {toolBarOptions.map((option) => {
          return (
            <Tooltip title={option.tooltipTitle} key={option.id}>
              <span className="text-white cursor-pointer text-lg transition-all duration-100 p-2 rounded-md hover:bg-[#3e464c]">
                {option.icon}
              </span>
            </Tooltip>
          );
        })}
      </div>
    </>
  );
};

export default ToolBar;
