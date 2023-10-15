import React, { useState } from "react";
import { HiOutlineCloudDownload } from "react-icons/hi";
import { BiUndo, BiRedo, BiSolidPencil, BiCircle } from "react-icons/bi";
import { LuEraser } from "react-icons/lu";
import { RiRectangleLine } from "react-icons/ri";
import { MdOutlineMenu } from "react-icons/md";
import Tooltip from "../Tooltip/Tooltip";
import AsideMenu from "../Aside/AsideMenu";

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

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center px-2">
        <div className="relative">
          <button className="w-max p-2.5 mx-2 my-4 flex gap-1 bg-[#262627] rounded-md items-center justify-center text-white hover:bg-[#30363a] transition-all duration-100 relative" onClick={() => setOpen(!open)}>
            <MdOutlineMenu />
          </button>
          {open && <AsideMenu />}
        </div>
        <div className="w-max p-4 mx-auto my-4 flex gap-1 bg-[#262627] rounded-md h-[2.5rem] items-center justify-center">
          {toolBarOptions.map((option) => {
            return (
              <Tooltip title={option.tooltipTitle} key={option.id}>
                <span className="text-white cursor-pointer text-lg transition-all duration-100 p-2 rounded-md hover:bg-[#586168]">
                  {option.icon}
                </span>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ToolBar;
