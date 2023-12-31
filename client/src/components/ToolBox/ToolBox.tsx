import React from "react";
import CommonTools from "./CommonTools";
import EraserTool from "./EraserTool";
import { useAppSelector } from "../../app/hooks";

const ToolBox: React.FC = () => {

  const {currentTool} = useAppSelector((state) => state.Tools);

  if(!currentTool || currentTool === null) return null;

  return (
    <>
      <div className="w-[12.5rem] h-max dark:bg-[#1e1e1e] bg-white absolute left-4 p-2 top-20 rounded-lg flex flex-col">
        {
          currentTool === "common" ? <CommonTools /> : currentTool === "eraser" ? <EraserTool /> : null
        }
      </div>
    </>
  );
};

export default ToolBox;
