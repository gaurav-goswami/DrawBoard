import React, { useEffect, useRef, useState } from "react";
import { HiOutlineCloudDownload } from "react-icons/hi";
import { BiUndo, BiRedo, BiSolidPencil, BiCircle } from "react-icons/bi";
import { LuEraser } from "react-icons/lu";
import { RiRectangleLine } from "react-icons/ri";
import { MdOutlineMenu, MdClose } from "react-icons/md";
import {AiOutlineMinus} from "react-icons/ai";
import Tooltip from "../Tooltip/Tooltip";
import AsideMenu from "../Aside/AsideMenu";
import ToolWrapper from "../Wrapper/ToolWrapper";
import { useDispatch } from "react-redux";
import { setCurrentToolType, setSelectedTool } from "../../app/features/Tools";
import { useAppSelector } from "../../app/hooks";

interface IToolBarOption {
  id: number | string;
  icon: JSX.Element;
  tooltipTitle?: string;
  dispatch?: boolean | null;
}

const toolBarOptions: IToolBarOption[] = [
  {
    id: 1,
    icon: <BiSolidPencil />,
    tooltipTitle: "Pencil",
    dispatch: true,
  },
  {
    id: 2,
    icon: <RiRectangleLine />,
    tooltipTitle: "Box",
    dispatch: true,
  },
  {
    id: 3,
    icon: <AiOutlineMinus />,
    tooltipTitle: "Line",
    dispatch: null,
  },
  {
    id: 4,
    icon: <BiCircle />,
    tooltipTitle: "Circle",
    dispatch: true,
  },
  {
    id: 5,
    icon: <BiUndo />,
    tooltipTitle: "Undo",
    dispatch: null,
  },
  {
    id: 6,
    icon: <BiRedo />,
    tooltipTitle: "Redo",
    dispatch: null,
  },
  {
    id: 7,
    icon: <LuEraser />,
    tooltipTitle: "Eraser",
    dispatch: false,
  },
  {
    id: 8,
    icon: <HiOutlineCloudDownload />,
    tooltipTitle: "Download",
    dispatch: null,
  },
];

const ToolBar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const asideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClose = (e: any) => {
      if (asideRef.current) {
        if (!asideRef.current.contains(e.target)) {
          setOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, []);

  const dispatch = useDispatch();
  const showTools = (option: IToolBarOption) => {
    dispatch(setSelectedTool(option.tooltipTitle));
    switch (option.dispatch) {
      case true:
        dispatch(setCurrentToolType("common"));
        break;
      case false:
        dispatch(setCurrentToolType("eraser"));
        break;
      default:
        dispatch(setCurrentToolType(null));
        break;
    }
  };

  const { selectedTool } = useAppSelector((state) => state.Tools);
  return (
    <>
      <ToolWrapper>
        <div className="flex items-center px-2 h-[4rem]">
          <div className="relative" ref={asideRef}>
            <button
              className="w-max mx-2 my-4 flex gap-1 dark:bg-[#262627] bg-[#b0baf549] rounded-md items-center justify-center dark:text-white text-gray-800 dark:hover:bg-[#30363a] hover:bg-[#b0baf52e] transition-all duration-100 relative"
              onClick={() => setOpen(!open)}
            >
              {!open ? (
                <MdOutlineMenu className="w-full h-full p-2.5" />
              ) : (
                <MdClose className="w-full h-full p-2.5" />
              )}
            </button>
            {open && <AsideMenu />}
          </div>
          <div className="w-max p-4 mx-auto flex gap-1 dark:bg-[#262627] bg-white rounded-md h-[2.5rem] items-center justify-center">
            {toolBarOptions.map((option) => {
              return (
                <Tooltip title={option.tooltipTitle} key={option.id}>
                  <span
                    className={`dark:text-white cursor-pointer text-lg transition-all duration-100 p-2 rounded-md dark:hover:bg-[#586168] hover:bg-[#b0baf539] text-gray-700 ${selectedTool === option.tooltipTitle ? "bg-[#6c80f095]" : ""}`}
                    onClick={() => showTools(option)}
                  >
                    {option.icon}
                  </span>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </ToolWrapper>
    </>
  );
};

export default ToolBar;
