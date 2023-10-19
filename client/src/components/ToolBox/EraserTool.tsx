import React from "react";
import Size from "./Size";

const EraserTool: React.FC = () => {
  return (
    <>
      <div className="dark:text-gray-400 text-gray-950 w-full h-max py-2 flex flex-col">
        <span className="text-[14px] font-assistant">Size</span>
        {/* opactiy*/}
        <div className="h-7 w-full flex gap-2 mt-2 items-center">
          <Size />
        </div>
      </div>
    </>
  );
};

export default EraserTool;
