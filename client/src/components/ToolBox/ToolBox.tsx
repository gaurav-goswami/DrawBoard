import React from "react";
import CommonTools from "./CommonTools";
import BrushTool from "./BrushTool";
import { useAppSelector } from "../../app/hooks";

const ToolBox: React.FC = () => {

  const {currentTool} = useAppSelector((state) => state.Tools);

  if(!currentTool || currentTool === null) return null;
  console.log("current tool is" , currentTool);

  return (
    <>
      <div className="w-[12.5rem] h-max dark:bg-[#1e1e1e] bg-white absolute left-4 p-2 top-2 rounded-lg flex flex-col">
        {
          currentTool === "common" ? <CommonTools /> : currentTool === "brush" ? <BrushTool /> : null
        }
      </div>
    </>
  );
};

export default ToolBox;
